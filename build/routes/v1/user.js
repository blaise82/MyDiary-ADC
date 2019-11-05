"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _signupValidateData = _interopRequireDefault(require("../../middleware/v1/signupValidateData.joi"));

var _signinValidateData = _interopRequireDefault(require("../../middleware/v1/signinValidateData.joi"));

var _User = _interopRequireDefault(require("../../controllers/v1/User"));

var router = _express["default"].Router();

router.post('/signup', _signupValidateData["default"], _User["default"].signUp);
router.post('/signin', _signinValidateData["default"], _User["default"].signIn);
var _default = router;
exports["default"] = _default;