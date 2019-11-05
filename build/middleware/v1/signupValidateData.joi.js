"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var checkNewUser = function checkNewUser(req, res, next) {
  var UserSchemas = _joi["default"].object().keys({
    firstname: _joi["default"].string().alphanum().min(3).max(20).required(),
    lastname: _joi["default"].string().alphanum().min(3).max(20).required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    password: _joi["default"].string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()
  });

  var schema = _joi["default"].validate(req.body, UserSchemas);

  if (schema.error) {
    var errors = [];

    for (var i = 0; i < schema.error.details.length; i += 1) {
      errors.push(schema.error.details[i].message.split('"').join(' '));
    }

    if (errors[0].startsWith(' password  with value')) {
      var message = 'Your Password Must be at least 1 lowercase,1 uppercase,1 numeric character, one special character, be eight characters or longer';
      return res.status(400).json({
        status: 400,
        error: message
      });
    }

    return res.status(400).json({
      status: 400,
      error: errors[0]
    });
  }

  next();
};

var _default = checkNewUser;
exports["default"] = _default;