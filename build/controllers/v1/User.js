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

var _User = _interopRequireDefault(require("../../models/User"));

var User =
/*#__PURE__*/
function () {
  function User() {
    (0, _classCallCheck2["default"])(this, User);
  }

  (0, _createClass2["default"])(User, null, [{
    key: "signUp",
    value: function () {
      var _signUp = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, firstname, lastname, password, userFound, hashedPassword, newUser, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, firstname = _req$body.firstname, lastname = _req$body.lastname, password = _req$body.password;
                userFound = _User["default"].users.find(function (user) {
                  return user.email === email;
                });

                if (!userFound) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(401).send({
                  status: 401,
                  error: 'Email already exist'
                }));

              case 4:
                _context.next = 6;
                return _bcrypt["default"].hash(password, 10);

              case 6:
                hashedPassword = _context.sent;
                newUser = {
                  id: _uuid["default"].v4(),
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  reminder: 'off',
                  password: hashedPassword,
                  createdDate: (0, _moment["default"])().format('LLLL')
                };

                _User["default"].users.push(newUser);

                token = _jsonwebtoken["default"].sign({
                  firstname: firstname,
                  lastname: lastname,
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

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
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
        var _req$body2, email, password, userFound, hashedPassword, firstname, lastname, reminder, compare, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                userFound = _User["default"].users.find(function (user) {
                  return user.email === email;
                });

                if (!userFound) {
                  _context2.next = 13;
                  break;
                }

                hashedPassword = userFound.password, firstname = userFound.firstname, lastname = userFound.lastname, reminder = userFound.reminder;
                _context2.next = 6;
                return _bcrypt["default"].compare(password, hashedPassword);

              case 6:
                compare = _context2.sent;

                if (!compare) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 10;
                return _jsonwebtoken["default"].sign({
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  reminder: reminder
                }, process.env.SECRET, {
                  expiresIn: '7d'
                });

              case 10:
                token = _context2.sent;
                return _context2.abrupt("return", res.status(202).json({
                  status: 202,
                  message: 'User logged in successfully',
                  data: {
                    token: token
                  }
                }));

              case 12:
                return _context2.abrupt("return", res.status(401).json({
                  status: 401,
                  error: 'incorrect password'
                }));

              case 13:
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  error: 'Email not found'
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);
  return User;
}();

var _default = User;
exports["default"] = _default;