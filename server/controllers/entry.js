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

  static getOne(req, res) {
    const { id } = req.params;
    const { email } = req.tokenData;
    const Found = entryModel.entries.find((element) => element.id === id);
    if (!Found) {
      return res.status(404).json({
        status: 404,
        error: 'entry not found',
      });
    }
    if (Found.createdBy !== email) {
      return res.status(401).json({
        status: 401,
        error: 'This entry does not belong to you',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        Found,
      },
    });
  }
}

export default Entry;
