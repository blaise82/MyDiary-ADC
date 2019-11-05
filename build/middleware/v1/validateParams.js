"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var validateParams = function validateParams(req, res, next) {
  var UserSchemas = _joi["default"].object().keys({
    id: _joi["default"].string().guid()
  });

  var schema = _joi["default"].validate(req.params, UserSchemas);

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

var _default = validateParams;
exports["default"] = _default;