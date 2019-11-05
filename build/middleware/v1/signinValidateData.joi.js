"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var checkNewUser = function checkNewUser(req, res, next) {
  var UserSchema = _joi["default"].object().keys({
    email: _joi["default"].string().email({
      minDomainSegments: 2
    }).required(),
    password: _joi["default"].string().min(3).max(20).required()
  });

  var schema = _joi["default"].validate(req.body, UserSchema);

  if (schema.error) {
    var error = [];

    for (var i = 0; i < schema.error.details.length; i += 1) {
      error.push(schema.error.details[i].message.split('"').join(' '));
    }

    return res.status(400).json({
      status: 400,
      error: error[0]
    });
  }

  next();
};

var _default = checkNewUser;
exports["default"] = _default;