"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _uuid = _interopRequireDefault(require("uuid"));

var _moment = _interopRequireDefault(require("moment"));

var _entry = _interopRequireDefault(require("../../models/entry"));

var Entry =
/*#__PURE__*/
function () {
  function Entry() {
    (0, _classCallCheck2["default"])(this, Entry);
  }

  (0, _createClass2["default"])(Entry, null, [{
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
          title = _req$body.title,
          description = _req$body.description;
      var createdBy = req.tokenData.email;
      var newEntry = {
        id: _uuid["default"].v4(),
        title: title,
        description: description,
        createdBy: createdBy,
        createdDate: (0, _moment["default"])().format('LLLL'),
        modifiedDate: (0, _moment["default"])().format('LLLL')
      };

      _entry["default"].entries.push(newEntry);

      return res.status(201).json({
        status: 201,
        message: 'entry successfully created',
        data: {
          newEntry: newEntry
        }
      });
    }
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      var myEntries = [];

      for (var index = 0; index < _entry["default"].entries.length; index += 1) {
        if (_entry["default"].entries[index].createdBy === req.tokenData.email) {
          myEntries.push(_entry["default"].entries[index]);
        }
      }

      return res.status(200).json({
        status: 200,
        data: {
          myEntries: myEntries
        }
      });
    }
  }, {
    key: "getOne",
    value: function getOne(req, res) {
      var id = req.params.id;
      var email = req.tokenData.email;

      var Found = _entry["default"].entries.find(function (element) {
        return element.id === id;
      });

      if (!Found) {
        return res.status(404).json({
          status: 404,
          error: 'entry not found'
        });
      }

      if (Found.createdBy !== email) {
        return res.status(401).json({
          status: 401,
          error: 'This entry does not belong to you'
        });
      }

      return res.status(200).json({
        status: 200,
        data: {
          Found: Found
        }
      });
    }
  }, {
    key: "update",
    value: function update(req, res) {
      var _req$body2 = req.body,
          title = _req$body2.title,
          description = _req$body2.description;
      var id = req.params.id;
      var email = req.tokenData.email;

      var Found = _entry["default"].entries.find(function (element) {
        return element.id === id;
      });

      if (!Found) {
        return res.status(404).json({
          status: 404,
          error: 'entry not found'
        });
      }

      if (Found.createdBy !== email) {
        return res.status(401).json({
          status: 401,
          error: 'This entry does not belong to you'
        });
      }

      var index = _entry["default"].entries.indexOf(Found);

      _entry["default"].entries[index].title = title || Found.title;
      _entry["default"].entries[index].description = description || Found.description;
      _entry["default"].entries[index].modifiedDate = (0, _moment["default"])().format('LLLL');
      var modified = _entry["default"].entries[index];
      return res.status(200).json({
        status: 200,
        message: 'entry successfully edited',
        data: {
          modified: modified
        }
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var id = req.params.id;
      var email = req.tokenData.email;

      var Found = _entry["default"].entries.find(function (element) {
        return element.id === id;
      });

      if (!Found) {
        return res.status(404).json({
          status: 404,
          error: 'entry not found'
        });
      }

      if (Found.createdBy !== email) {
        return res.status(401).json({
          status: 401,
          error: 'This entry does not belong to you'
        });
      }

      var index = _entry["default"].entries.indexOf(Found);

      _entry["default"].entries.splice(index, 1);

      return res.status(204).json({
        status: 204,
        message: 'entry successfully deleted'
      });
    }
  }]);
  return Entry;
}();

var _default = Entry;
exports["default"] = _default;