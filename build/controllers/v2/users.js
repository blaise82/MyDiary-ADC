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

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _connect = _interopRequireDefault(require("../../database/connect"));

var Users =
/*#__PURE__*/
function () {
  function Users() {
    (0, _classCallCheck2["default"])(this, Users);
  }

  (0, _createClass2["default"])(Users, null, [{
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, firstname, lastname, password, findAllQuery, _ref, rowCount, text, hashedPassword, values, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, firstname = _req$body.firstname, lastname = _req$body.lastname, password = _req$body.password;
                findAllQuery = 'SELECT * FROM users WHERE email= $1';
                _context.prev = 2;
                _context.next = 5;
                return _connect["default"].query(findAllQuery, [email]);

              case 5:
                _ref = _context.sent;
                rowCount = _ref.rowCount;

                if (!rowCount) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", res.status(401).send({
                  status: 401,
                  error: 'Email already exist'
                }));

              case 9:
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0.message);
                return _context.abrupt("return", res.status(400).json(_context.t0));

              case 15:
                text = "INSERT INTO\n      users(id, firstname, lastname, email,reminder, created_date, password)\n      VALUES($1, $2, $3, $4, $5, $6, $7)";
                _context.next = 18;
                return _bcrypt["default"].hash(password, 10);

              case 18:
                hashedPassword = _context.sent;
                values = [_uuid["default"].v4(), firstname, lastname, email, 'off', (0, _moment["default"])().format('LLLL'), hashedPassword];
                _context.prev = 20;
                _context.next = 23;
                return _connect["default"].query(text, values);

              case 23:
                token = _jsonwebtoken["default"].sign({
                  email: email
                }, process.env.SECRET, {
                  expiresIn: '7d'
                });
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  message: 'User created successfully',
                  data: {
                    token: token
                  }
                }));

              case 27:
                _context.prev = 27;
                _context.t1 = _context["catch"](20);
                return _context.abrupt("return", res.status(400).send(_context.t1));

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 11], [20, 27]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, email, password, findAllQuery, _ref2, rows, rowCount, hashedPassword, compare, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                findAllQuery = 'SELECT * FROM users WHERE email= $1';
                _context2.prev = 2;
                _context2.next = 5;
                return _connect["default"].query(findAllQuery, [email]);

              case 5:
                _ref2 = _context2.sent;
                rows = _ref2.rows;
                rowCount = _ref2.rowCount;

                if (rowCount) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'user with this Email not found'
                }));

              case 10:
                hashedPassword = rows[0].password;
                _context2.next = 13;
                return _bcrypt["default"].compare(password, hashedPassword);

              case 13:
                compare = _context2.sent;

                if (!compare) {
                  _context2.next = 17;
                  break;
                }

                token = _jsonwebtoken["default"].sign({
                  email: email
                }, process.env.SECRET, {
                  expiresIn: '7d'
                });
                return _context2.abrupt("return", res.status(202).json({
                  status: 202,
                  message: 'User logged in successfully',
                  data: {
                    token: token
                  }
                }));

              case 17:
                return _context2.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'Wrong Password'
                }));

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", res.status(400).json(_context2.t0));

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 20]]);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);
  return Users;
}();

var _default = Users;
exports["default"] = _default;