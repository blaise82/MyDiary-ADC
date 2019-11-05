"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../../models/User"));

function checkToken(_x, _x2, _x3) {
  return _checkToken.apply(this, arguments);
}

function _checkToken() {
  _checkToken = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var token, InUserEmail, authUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return req.headers.auth;

          case 2:
            token = _context2.sent;

            if (!(typeof token !== 'undefined')) {
              _context2.next = 11;
              break;
            }

            _jsonwebtoken["default"].verify(token, 'Secret Key',
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
                        verified = _jsonwebtoken["default"].verify(token, 'Secret Key');
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

            authUser = _User["default"].users.find(function (user) {
              return user.email === InUserEmail;
            });

            if (authUser) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(401).send({
              status: 401,
              error: 'not authorized to do the task'
            }));

          case 8:
            next();
            _context2.next = 12;
            break;

          case 11:
            res.status(403).send({
              status: 403,
              error: 'not authorized to do the task(forbidden)'
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkToken.apply(this, arguments);
}

var _default = checkToken;
exports["default"] = _default;