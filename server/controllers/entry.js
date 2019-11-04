import uuid from 'uuid';
import moment from 'moment';
import entryModel from '../models/entry';

class Entry {
  static create(req, res) {
    const { title, description } = req.body;
    const createdBy = req.tokenData.email;
    const newEntry = {
      id: uuid.v4(),
      title,
      description,
      createdBy,
      createdDate: moment().format('LLLL'),
      modifiedDate: moment().format('LLLL'),
    };
    entryModel.entries.push(newEntry);
    return res.status(201).json({
      status: 201,
      message: 'entry successfully created',
      data: {
        newEntry,
      },
    });
  }
}

export default Entry;
