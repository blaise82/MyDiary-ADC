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

  static getAll(req, res) {
    const myEntries = [];
    for (let index = 0; index < entryModel.entries.length; index += 1) {
      if (entryModel.entries[index].createdBy === req.tokenData.email) {
        myEntries.push(entryModel.entries[index]);
      }
    }
    return res.status(200).json({
      status: 200,
      data: { myEntries },
    });
  }
}

export default Entry;
