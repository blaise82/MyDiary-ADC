"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var checkNewEntry = function checkNewEntry(req, res, next) {
  var UserSchema = _joi["default"].object().keys({
    title: _joi["default"].string().required(),
    description: _joi["default"].string().required()
  });

  var schema = _joi["default"].validate(req.body, UserSchema);

  if (schema.error) {
    var errors = [];

    for (var i = 0; i < schema.error.details.length; i += 1) {
      errors.push(schema.error.details[i].message.split('"').join(' '));
    }

    return res.status(400).json({
      status: 400,
      error: errors[0]
    });
  }

  next();
};

var _default = checkNewEntry;
exports["default"] = _default;