"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var User = function User() {
  (0, _classCallCheck2["default"])(this, User);
  this.users = [{
    id: '2dc431bf-5af5-40c4-9f52-75a2c8939b42',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'example@gmail.com',
    reminder: 'off',
    password: '$2b$10$P4Aw/bj0axgK20Zn7zYpnuyH7ezdekXzjrfqL4BgjY2BkY4RBy/G2',
    // Password@100
    createdDate: 'Wednesday, October 23, 2019 5:35 PM'
  }, {
    id: '2dc431bf-5af5-40c4-9f52-75a2c8939b43',
    firstname: 'secondUser',
    lastname: 'secondUserOn',
    email: 'secondUser@gmail.com',
    reminder: 'off',
    password: '$2b$10$P4Aw/bj0axgK20Zn7zYpnuyH7ezdekXzjrfqL4BgjY2BkY4RBy/G2',
    // Password@100
    createdDate: 'Wednesday, October 23, 2019 5:35 PM'
  }];
};

var _default = new User();

exports["default"] = _default;