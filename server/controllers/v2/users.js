
import bcrypt from 'bcrypt';
import moment from 'moment';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import conn from '../../database/connect';

class Users {
  static async signUp(req, res) {
    const {
      email, firstname, lastname, password,
    } = req.body;
    const findAllQuery = 'SELECT * FROM users WHERE email= $1';
    try {
      const { rowCount } = await conn.query(findAllQuery, [email]);
      if (rowCount) {
        return res.status(401).json({
          status: 401,
          error: 'Email already exist',
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    const insertQuery = `INSERT INTO
      users(id, firstname, lastname, email,reminder, created_date, password)
      VALUES($1, $2, $3, $4, $5, $6, $7)`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [
      uuid.v4(),
      firstname,
      lastname,
      email,
      'off',
      moment().format('LLLL'),
      hashedPassword,
    ];

    try {
      await conn.query(insertQuery, values);
      const token = jwt.sign(
        { email },
        process.env.SECRET,
        { expiresIn: '7d' },
      );
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: {
          token,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const findAllQuery = 'SELECT * FROM users WHERE email= $1';
    try {
      const { rows, rowCount } = await conn.query(findAllQuery, [email]);
      if (!rowCount) {
        return res
          .status(404)
          .json({
            status: 404,
            error: 'user with this Email not found',
          });
      }
      const hashedPassword = rows[0].password;
      const compare = await bcrypt.compare(password, hashedPassword);
      if (compare) {
        const token = jwt.sign(
          { email },
          process.env.SECRET,
          { expiresIn: '7d' },
        );
        return res.status(202).json({
          status: 202,
          message: 'User logged in successfully',
          data: { token },
        });
      }
      return res
        .status(401)
        .json({ status: 401, error: 'Wrong Password' });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async updateReminder(req, res) {
    const { email } = req.tokenData;
    const selectQuery = 'SELECT * FROM users WHERE email=$1';
    const updateOneQuery = `UPDATE users
  SET reminder=$1 WHERE email=$2 returning *`;
    try {
      const responseSelect = await conn.query(selectQuery, [email]);
      if (!responseSelect.rows[0]) {
        return res.status(400).json({
          status: 400,
          message: 'user not found',
        });
      }
      let response;
      if (responseSelect.rows[0].reminder === 'on') {
        response = await conn.query(updateOneQuery, ['off', email]);
      } else {
        response = await conn.query(updateOneQuery, ['on', email]);
      }
      const modified = response.rows[0];
      return res.status(200).json({
        status: 200,
        message: `${modified.firstname}, Reminder is set ${modified.reminder}`,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default Users;
