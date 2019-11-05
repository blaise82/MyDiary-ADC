"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _connect = _interopRequireDefault(require("../../database/connect"));

function checkToken(_x, _x2, _x3) {
  return _checkToken.apply(this, arguments);
}

function _checkToken() {
  _checkToken = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var token, InUserEmail, findAllQuery, _ref2, rowCount;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.headers.auth;

          case 2:
            token = _context2.sent;

            if (!(typeof token !== 'undefined')) {
              _context2.next = 21;
              break;
            }

            _jsonwebtoken["default"].verify(token, process.env.SECRET,
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(err, result) {
                var verified;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!err) {
                          _context.next = 5;
                          break;
                        }

                        if (!(err.name === 'TokenExpiredError')) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", res.status(403).send({
                          status: 403,
                          error: 'TokenExpired'
                        }));

                      case 3:
                        _context.next = 8;
                        break;

                      case 5:
                        InUserEmail = result.email;
                        verified = _jsonwebtoken["default"].verify(token, process.env.SECRET);
                        req.tokenData = verified;

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4, _x5) {
                return _ref.apply(this, arguments);
              };
            }());

            findAllQuery = 'SELECT * FROM users WHERE email=$1';
            _context2.prev = 6;
            _context2.next = 9;
            return _connect["default"].query(findAllQuery, [InUserEmail]);

          case 9:
            _ref2 = _context2.sent;
            rowCount = _ref2.rowCount;

            if (rowCount) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(401).send({
              status: 401,
              error: 'not authorized to do the task'
            }));

          case 13:
            next();
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](6);
            return _context2.abrupt("return", res.status(400).send(_context2.t0.message));

          case 19:
            _context2.next = 22;
            break;

          case 21:
            res.status(403).send({
              status: 403,
              error: 'not authorized to do the task(forbidden)'
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 16]]);
  }));
  return _checkToken.apply(this, arguments);
}

var _default = checkToken;
exports["default"] = _default;