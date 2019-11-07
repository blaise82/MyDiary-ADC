import uuid from 'uuid';
import moment from 'moment';
import conn from '../../database/connect';

class Entry {
  static async add(req, res) {
    const { title, description } = req.body;
    const createdBy = req.tokenData.email;
    const insertQuery = `INSERT INTO
      entries(id, title, description, created_by,created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)`;
    const id = uuid.v4();
    const createdDate = moment().format('LLLL');
    const modifiedDate = moment().format('LLLL');
    const newEntry = [
      id,
      title,
      description,
      createdBy,
      createdDate,
      modifiedDate,
    ];
    try {
      await conn.query(insertQuery, newEntry);
      return res.status(201).json({
        status: 201,
        message: 'entry successfully created',
        data: {
          id,
          title,
          description,
          createdBy,
          createdDate,
          modifiedDate,
        },
      });
    } catch (error) {
      return res.status(422).json({
        status: 422,
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
        status: 200,
        data: {
          rows,
        },
      });
    } catch (erro) {
      const error = erro.message;
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const selectQuery = 'SELECT * FROM entries WHERE id = $1 AND created_by = $2';
    try {
      const { rows } = await conn.query(selectQuery, [id, email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 401,
          error: 'Access Denied',
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
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const selectQuery = 'SELECT * FROM entries WHERE id=$1 AND created_by=$2';
    const updateOneQuery = `UPDATE entries
  SET title=$1,description=$2,modified_date=$3
  WHERE id=$4 returning *`;
    try {
      const { rows } = await conn.query(selectQuery, [id, email]);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          message: 'Access Denied',
        });
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
      return res.status(400).json(
        {
          status: 400,
          error,
        },
      );
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const deleteQuery = 'DELETE FROM entries WHERE id=$1 AND created_by=$2 returning *';
    try {
      const { rows } = await conn.query(deleteQuery, [id, email]);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'Access Denied',
        });
      }
      return res.status(204).json({ message: 'entry deleted successfully' });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async getTotal(req, res) {
    const createdBy = req.tokenData.email;
    const findAllQuery = 'SELECT * FROM entries WHERE created_by=$1';
    try {
      const { rowCount } = await conn.query(findAllQuery, [createdBy]);
      return res.status(200).json({
        message: `You have ${rowCount} entries`,
        data: {
          rowCount,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status:400,
        error,
      });
    }
  }
}
export default Entry;
