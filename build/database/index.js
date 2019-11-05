"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropTables = exports.createTables = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

var createTables = function createTables() {
  var users = "\n    CREATE TABLE IF NOT EXISTS users(\n        id VARCHAR(250) PRIMARY KEY,\n        firstname VARCHAR(250) NOT NULL,\n        lastname VARCHAR(250) NOT NULL,\n        email VARCHAR(250) UNIQUE NOT NULL,\n        reminder VARCHAR(250) NOT NULL, \n        created_date VARCHAR(250) NOT NULL,\n        password VARCHAR(250) NOT NULL\n    );";
  var entries = "\n    CREATE TABLE IF NOT EXISTS entries(\n        id VARCHAR(250) PRIMARY KEY,\n        title VARCHAR (250) NOT NULL,\n        description VARCHAR (250) NOT NULL,\n        created_by VARCHAR (250) NOT NULL,\n        created_date VARCHAR (250) NOT NULL,\n        modified_date VARCHAR (250) NOT NULL\n    );";
  var createUser1 = "\n    INSERT INTO \n    users(id, firstname, lastname, email,reminder, created_date, password) \n    VALUES(\n      '9011eecd-6575-420b-8705-cd2aa1bd58f7',\n      'firstname',\n     'lastname',\n     'email@gmail.com',\n     'off',\n     'Monday, November 4, 2019 11:05 AM',\n     '$2b$10$XwBcl5JnZumu8D0oNRF81eWkIelL5VZ36lmYy38rJtJwSDCQuGxOS');";
  var createUser2 = "\n     INSERT INTO \n     users(id, firstname, lastname, email,reminder, created_date, password) \n     VALUES(\n       '9011eecd-6575-420b-8705-cd2aa1bd58f4',\n       'firstname2',\n      'lastname2',\n      'email2@gmail.com',\n      'off',\n      'Monday, November 4, 2019 11:05 AM',\n      '$2b$10$XwBcl5JnZumu8D0oNRF81eWkIelL5VZ36lmYy38rJtJwSDCQuGxOS');";
  var createEntry1 = "\n    INSERT INTO\n    entries(id, title, description, created_by,created_date, modified_date)\n    VALUES('63835241-9fee-435f-a4ce-2bbb99fc896b',\n    'my first entry',\n    'my description',\n    'email@gmail.com',\n    'Monday, November 4, 2019 9:02 AM',\n    'Monday, November 4, 2019 9:02 AM');\n    ";
  var createEntry2 = "\n    INSERT INTO\n    entries(id, title, description, created_by,created_date, modified_date)\n    VALUES('39b252f5-77b9-4231-8965-ffef1b8b510c',\n    'my first entry 2',\n    'my description 2',\n    'email2@gmail.com',\n    'Monday, November 4, 2019 9:02 AM',\n    'Monday, November 4, 2019 9:02 AM');\n    ";
  var queries = "".concat(users, ";").concat(entries, ";").concat(createUser1, ";").concat(createUser2, ";").concat(createEntry1, ";").concat(createEntry2);
  pool.query(queries).then(function (res) {
    pool.end();
    return res;
  })["catch"](function () {
    pool.end();
  });
};

exports.createTables = createTables;

var dropTables = function dropTables() {
  var drop = "\n        DROP TABLE IF EXISTS users CASCADE;\n        DROP TABLE IF EXISTS entries CASCADE;\n    ";
  var Queries = "".concat(drop);
  pool.query(Queries).then(function (res) {
    pool.end();
    return res;
  })["catch"](function () {
    pool.end();
  });
};

exports.dropTables = dropTables;

require('make-runnable');