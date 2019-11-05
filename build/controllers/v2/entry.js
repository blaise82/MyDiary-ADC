"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _uuid = _interopRequireDefault(require("uuid"));

var _moment = _interopRequireDefault(require("moment"));

var _connect = _interopRequireDefault(require("../../database/connect"));

var Entry =
/*#__PURE__*/
function () {
  function Entry() {
    (0, _classCallCheck2["default"])(this, Entry);
  }

  (0, _createClass2["default"])(Entry, null, [{
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, title, description, createdBy, text, newEntry;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, title = _req$body.title, description = _req$body.description;
                createdBy = req.tokenData.email;
                text = "INSERT INTO\n      entries(id, title, description, created_by,created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6)";
                newEntry = [_uuid["default"].v4(), title, description, createdBy, (0, _moment["default"])().format('LLLL'), (0, _moment["default"])().format('LLLL')];
                _context.prev = 4;
                _context.next = 7;
                return _connect["default"].query(text, newEntry);

              case 7:
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'entry successfully created',
                  data: {
                    newEntry: newEntry
                  }
                }));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", res.status(422).json({
                  error: _context.t0.message
                }));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      }));

      function add(_x, _x2) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var createdBy, findAllQuery, _ref, rows;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                createdBy = req.tokenData.email;
                findAllQuery = 'SELECT * FROM entries WHERE created_by=$1';
                _context2.prev = 2;
                _context2.next = 5;
                return _connect["default"].query(findAllQuery, [createdBy]);

              case 5:
                _ref = _context2.sent;
                rows = _ref.rows;
                return _context2.abrupt("return", res.status(200).json({
                  data: {
                    rows: rows
                  }
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", res.status(400).json(_context2.t0.message));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 10]]);
      }));

      function getAll(_x3, _x4) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var id, email, text, _ref2, rows, found;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                email = req.tokenData.email;
                text = 'SELECT * FROM entries WHERE id = $1 AND created_by = $2';
                _context3.prev = 3;
                _context3.next = 6;
                return _connect["default"].query(text, [id, email]);

              case 6:
                _ref2 = _context3.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'entry not found'
                }));

              case 10:
                found = rows[0];
                return _context3.abrupt("return", res.status(201).json({
                  status: 201,
                  data: {
                    found: found
                  }
                }));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](3);
                return _context3.abrupt("return", res.status(400).send(_context3.t0));

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[3, 14]]);
      }));

      function getOne(_x5, _x6) {
        return _getOne.apply(this, arguments);
      }

      return getOne;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var id, email, text, updateOneQuery, _ref3, rows, _req$body2, title, description, values, response, modified;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                email = req.tokenData.email;
                text = 'SELECT * FROM entries WHERE id=$1 AND created_by=$2';
                updateOneQuery = "UPDATE entries\n  SET title=$1,description=$2,modified_date=$3\n  WHERE id=$4 returning *";
                _context4.prev = 4;
                _context4.next = 7;
                return _connect["default"].query(text, [id, email]);

              case 7:
                _ref3 = _context4.sent;
                rows = _ref3.rows;

                if (rows[0]) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", res.status(404).send({
                  message: 'entry not found'
                }));

              case 11:
                _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
                values = [title || rows[0].title, description || rows[0].description, (0, _moment["default"])().format('LLLL'), req.params.id];
                _context4.next = 15;
                return _connect["default"].query(updateOneQuery, values);

              case 15:
                response = _context4.sent;
                modified = response.rows[0];
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'entry successfully edited',
                  data: {
                    modified: modified
                  }
                }));

              case 20:
                _context4.prev = 20;
                _context4.t0 = _context4["catch"](4);
                return _context4.abrupt("return", res.status(400).send(_context4.t0));

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[4, 20]]);
      }));

      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var id, email, deleteQuery, _ref4, rows;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                email = req.tokenData.email;
                deleteQuery = 'DELETE FROM entries WHERE id=$1 AND created_by=$2 returning *';
                _context5.prev = 3;
                _context5.next = 6;
                return _connect["default"].query(deleteQuery, [id, email]);

              case 6:
                _ref4 = _context5.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", res.status(404).send({
                  message: 'entry not found'
                }));

              case 10:
                return _context5.abrupt("return", res.status(200).send({
                  message: 'entry deleted successfully'
                }));

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](3);
                return _context5.abrupt("return", res.status(400).send(_context5.t0));

              case 16:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 13]]);
      }));

      function _delete(_x9, _x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return Entry;
}();

var _default = Entry;
exports["default"] = _default;