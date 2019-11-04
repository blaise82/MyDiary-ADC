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

  static async getAll(req, res) {
    const createdBy = req.tokenData.email;
    const findAllQuery = 'SELECT * FROM entries WHERE created_by=$1';
    try {
      const { rows } = await conn.query(findAllQuery, [createdBy]);
      return res.status(200).json({
        data: {
          rows,
        },
      });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
  
  static async getOne(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const text = 'SELECT * FROM entries WHERE id = $1 AND created_by = $2';
    try {
      const { rows } = await conn.query(text, [id, email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'entry not found',
        });
      }
      const found = rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          found,
        },
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(error);
    }
  }
}
export default Entry;
