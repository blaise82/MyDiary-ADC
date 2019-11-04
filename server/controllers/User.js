import bcrypt from 'bcrypt';
import moment from 'moment';
import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import userModel from '../models/User';

class User {
  static async signUp(req, res) {
    const {
      email, firstname, lastname, password,
    } = req.body;
    const userFound = userModel.users.find((user) => user.email === email);
    if (userFound) {
      return res.status(401).send({ status: 401, error: 'Email already exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuid.v4(),
      firstname,
      lastname,
      email,
      reminder: 'off',
      password: hashedPassword,
      createdDate: moment().format('LLLL'),
    };
    userModel.users.push(newUser);
    const token = jwt.sign({ firstname, lastname, email }, process.env.SECRET, { expiresIn: '7d' });
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  }
}
export default User;
