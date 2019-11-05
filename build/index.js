"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("./routes/v1/user"));

var _entry = _interopRequireDefault(require("./routes/v1/entry"));

var _user2 = _interopRequireDefault(require("./routes/v2/user"));

var _entry2 = _interopRequireDefault(require("./routes/v2/entry"));

_dotenv["default"].config();

var bodyParser = require('body-parser');

var app = (0, _express["default"])();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(_express["default"]["static"]('./ui'));
app.use('/api/v1/auth', _user["default"]);
app.use('/api/v1', _entry["default"]);
app.use('/api/v2/auth', _user2["default"]);
app.use('/api/v2', _entry2["default"]);
app.get('/', function (req, res) {
  return res.send('Server Is On');
});
app.use(function (req, res) {
  res.status(400).send({
    status: 400,
    error: 'Bad Request'
  });
});

if (!module.parent) {
  app.listen(process.env.PORT || 8080);
}

var _default = app;
exports["default"] = _default;