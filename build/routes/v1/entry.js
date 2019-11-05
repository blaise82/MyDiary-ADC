"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _entry = _interopRequireDefault(require("../../controllers/v1/entry"));

var _authenticate = _interopRequireDefault(require("../../middleware/v1/authenticate"));

var _checkNewEntry = _interopRequireDefault(require("../../middleware/v1/checkNewEntry"));

var _validateParams = _interopRequireDefault(require("../../middleware/v1/validateParams"));

var router = _express["default"].Router();

router.post('/entries', [_authenticate["default"], _checkNewEntry["default"]], _entry["default"].create);
router.get('/entries', _authenticate["default"], _entry["default"].getAll);
router.get('/entries/:id', [_validateParams["default"], _authenticate["default"]], _entry["default"].getOne);
router.patch('/entries/:id', [_validateParams["default"], _authenticate["default"], _checkNewEntry["default"]], _entry["default"].update);
router["delete"]('/entries/:id', [_validateParams["default"], _authenticate["default"]], _entry["default"]["delete"]);
var _default = router;
exports["default"] = _default;