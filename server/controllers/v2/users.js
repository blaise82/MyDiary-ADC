
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
        return res
          .status(401)
          .send({ status: 401, error: 'Email already exist' });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(error);
    }
    const text = `INSERT INTO
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
      await conn.query(text, values);
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
      return res.status(400).send(error);
    }
  }
}

export default Users;
