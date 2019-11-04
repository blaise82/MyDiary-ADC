import uuid from 'uuid';
import moment from 'moment';
import conn from '../../database/connect';

class Entry {
  static async add(req, res) {
    const { title, description } = req.body;
    const createdBy = req.tokenData.email;
    const text = `INSERT INTO
      entries(id, title, description, created_by,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)`;
    const newEntry = [
      uuid.v4(),
      title,
      description,
      createdBy,
      moment().format('LLLL'),
      moment().format('LLLL'),
    ];
    try {
      await conn.query(text, newEntry);
      return res.status(201).json({
        status: 201,
        message: 'entry successfully created',
        data: {
          newEntry,
        },
      });
    } catch (error) {
      return res.status(422).json({
        error: error.message,
      });
    }
  }
}
export default Entry;
