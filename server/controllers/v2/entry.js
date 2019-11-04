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
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const text = 'SELECT * FROM entries WHERE id=$1 AND created_by=$2';
    const updateOneQuery = `UPDATE entries
  SET title=$1,description=$2,modified_date=$3
  WHERE id=$4 returning *`;
    try {
      const { rows } = await conn.query(text, [id, email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'entry not found' });
      }
      const { title, description } = req.body;
      const values = [
        title || rows[0].title,
        description || rows[0].description,
        moment().format('LLLL'),
        req.params.id,
      ];
      const response = await conn.query(updateOneQuery, values);
      const modified = response.rows[0];
      return res.status(200).json({
        status: 200,
        message: 'entry successfully edited',
        data: {
          modified,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const deleteQuery = 'DELETE FROM entries WHERE id=$1 AND created_by=$2 returning *';
    try {
      const { rows } = await conn.query(deleteQuery, [id, email]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'entry not found' });
      }
      return res.status(200).send({ message: 'entry deleted successfully' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
export default Entry;
