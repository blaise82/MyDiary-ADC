"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../../index"));

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('Server Config Check', function () {
  (0, _mocha.it)('Should return Server Is On', function (done) {
    _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
      (0, _chai.expect)(res);
      done();
    });
  });
  (0, _mocha.it)('Should return Bad Request(400 wrong route)', function (done) {
    _chai["default"].request(_index["default"]).get('/wrong').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property('error');
      done();
    });
  });
});
(0, _mocha.describe)('User Tests', function () {
  (0, _mocha.describe)('/POST User SignUp', function () {
    (0, _mocha.it)('Should Not Allow A User To SignUp With Invalid: firstname', function (done) {
      var testData2 = {
        firstname: '',
        lastname: 'lastname',
        email: 'userEmail@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData2).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should Not Allow A User To SignUp With Invalid: lastname', function (done) {
      var testData3 = {
        firstname: 'firstname',
        lastname: '',
        email: 'userEmail',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData3).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should Not Allow A User To SignUp With Invalid: email', function (done) {
      var testData4 = {
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'userEmail',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData4).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should Not Allow A User To SignUp With A Weak password', function (done) {
      var testData5 = {
        firstname: 'firstname',
        lastname: 'basename',
        email: 'userEmail@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData5).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT allow a user to signup if user email already exist', function (done) {
      var testData6 = {
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'example@gmail.com',
        password: 'Password@100'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData6).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should not allow a user to signup with a weak password', function (done) {
      var testData7 = {
        firstname: 'firstNameTest',
        lastname: 'lastNameTest',
        email: 'exampleTest@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(testData7).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should allow a user to signup', function (done) {
      var testData7 = {
        firstname: 'firstNameTest',
        lastname: 'lastNameTest',
        email: 'exampleTest@gmail.com',
        password: 'PasswordTest@100'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(testData7).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body).to.have.property('message');
        (0, _chai.expect)(res.body).to.have.property('data');
        done();
      });
    });
  });
  (0, _mocha.describe)('User Signin', function () {
    (0, _mocha.it)('Should NOT allow a user to signin without providing an email and a password ', function (done) {
      var testData8 = {
        password: 'Password@100'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(testData8).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT allow a user to signin: Email not found', function (done) {
      var testData9 = {
        email: 'testEmail@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData9).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT allow a user to signin: Incorrect password', function (done) {
      var testData10 = {
        email: 'example@gmail.com',
        password: 'wrongPassword'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData10).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT allow a user to signin without providing a password (empty or missing password ) ', function (done) {
      var testData11 = {
        email: 'example@gmail.com'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData11).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT allow a user to signin without providing an email (empty or missing email ) ', function (done) {
      var testData12 = {
        password: 'Password@100'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData12).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT allow a user to signin extra data ) ', function (done) {
      var testData12 = {
        email: 'example@gmail.com',
        password: 'Password@100',
        extra: 'hello there i am extra data'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData12).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should allow a user to signin', function (done) {
      var testData13 = {
        email: 'example@gmail.com',
        password: 'Password@100'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(testData13).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(202);
        (0, _chai.expect)(res.body).to.have.property('message');
        (0, _chai.expect)(res.body).to.have.property('data');
        done();
      });
    });
  });
});
(0, _mocha.describe)('Diary Entry test', function () {
  (0, _mocha.describe)('/POST /api/v1/entries (creation of a diary entry)', function () {
    (0, _mocha.it)('Should NOT Allow user to create an entry without title data', function (done) {
      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      var entryTestData1 = {
        description: 'my description'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/entries').set('auth', token).send(entryTestData1).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT Allow user to create an entry without description data', function (done) {
      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      var entryTestData2 = {
        title: 'my title'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/entries').set('auth', token).send(entryTestData2).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT Allow user to create an entry with invalid no data', function (done) {
      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).post('/api/v1/entries').set('auth', token).send({}).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT Allow user to create a new diary entry without a login token (logged in user)', function (done) {
      var entryTestData4 = {
        title: 'diary',
        description: 'Updated description'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/entries').send(entryTestData4).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(403);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should NOT Allow user to create a new diary entry with token fake token(fake email)', function (done) {
      var entryTestData5 = {
        title: 'Updated title',
        description: 'Updated description'
      };

      var token = _jsonwebtoken["default"].sign({
        email: 'invalid@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).post('/api/v1/entries').set('auth', token).send(entryTestData5).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should Allow user to  create an new diary entry', function (done) {
      var entryTestData = {
        title: 'new title',
        description: 'hi i am testing a new entry'
      };

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).post('/api/v1/entries').set('auth', token).send(entryTestData).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.data).to.be.a('object');
        (0, _chai.expect)(res.body).to.have.property('message');
        done();
      });
    });
  });
  (0, _mocha.describe)('/Get /api/v1/entries (Getting All entry)', function () {
    (0, _mocha.it)('should not allow user  get all entry without a token (authenticity)', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/entries').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(403);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('should not allow user  get all entry with a fake token (wrong secret key use)', function (done) {
      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, 'fake secret key').toString();

      _chai["default"].request(_index["default"]).get('/api/v1/entries').set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('should not allow user  get all entry with a fake token (wrong email)', function (done) {
      var token = _jsonwebtoken["default"].sign({
        email: 'fakeEmail@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).get('/api/v1/entries').set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('should get all entry of a given user', function (done) {
      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).get('/api/v1/entries').set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data).to.be.a('object');
        done();
      });
    });
  });
  (0, _mocha.describe)('/Get Entry description(Content)', function () {
    (0, _mocha.it)('Should now allow the use of non GUIDs', function (done) {
      var entryIdFinal = '231325343453453452345tggfgdfg';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).get("/api/v1/entries/".concat(entryIdFinal)).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should return entry not found', function (done) {
      var notfound = '098fcafe-2759-4c1b-957f-2c3baa6b9653';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).get("/api/v1/entries/".concat(notfound)).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should not return an entry: Token is not provided', function (done) {
      var trueId = '2dc431bf-5af5-40c4-9f52-75a2c8939b42';

      _chai["default"].request(_index["default"]).get("/api/v1/entries/".concat(trueId)).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(403);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should not return an entry : entry does not belong to you', function (done) {
      var trueId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'secondUser@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).get("/api/v1/entries/".concat(trueId2)).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should return an entry with the specified ID', function (done) {
      var entryIdFinal = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).get("/api/v1/entries/".concat(entryIdFinal)).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data).to.be.a('object');
        done();
      });
    });
  });
  (0, _mocha.describe)('/patch Modify an entry', function () {
    (0, _mocha.it)('Should return entry not found', function (done) {
      var notfound2 = '098fcafe-2759-4c1b-957f-2c3baa6b9653';
      var testEntry2 = {
        title: 'hello not found?',
        description: 'my updated description'
      };

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).patch("/api/v1/entries/".concat(notfound2)).set('auth', token).send(testEntry2).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.have.property('error');
      });

      done();
    });
    (0, _mocha.it)('Should Not Modify an Entry With no Title Provided', function (done) {
      var testEntry2 = {
        description: 'my updated description'
      };
      var entryId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).patch("/api/v1/entries/".concat(entryId2)).set('auth', token).send(testEntry2).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
      });

      done();
    });
    (0, _mocha.it)('Should Not Modify an Entry With no description Provided', function (done) {
      var testEntry3 = {};
      var entryId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).patch("/api/v1/entries/".concat(entryId2)).set('auth', token).send(testEntry3).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
      });

      done();
    });
    (0, _mocha.it)('Should Not Allow User To Modify An Entry Which Is Not His/Hers', function (done) {
      var entryId4 = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'secondUser@gmail.com'
      }, process.env.SECRET).toString();

      var testEntry5 = {
        title: 'Updated Title',
        description: 'Updated description'
      };

      _chai["default"].request(_index["default"]).patch("/api/v1/entries/".concat(entryId4)).set('auth', token).send(testEntry5).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should Not Allow Modification Without An Authentication (No Login)', function (done) {
      var entryId6 = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      var testEntry6 = {
        title: 'Updated Title',
        description: 'Updated description'
      };
      var token = '';

      _chai["default"].request(_index["default"]).patch("/api/v1/entries/".concat(entryId6)).set('auth', token).send(testEntry6).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
        done();
      });
    });
    (0, _mocha.it)('Should successfully modify Entry', function (done) {
      var testEntry = {
        title: 'My updated title',
        description: 'my updated description'
      };
      var entryId = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"]).patch("/api/v1/entries/".concat(entryId)).set('auth', token).send(testEntry).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.data).to.be.a('object');
        (0, _chai.expect)(res.body).to.have.property('message');
        done();
      });
    });
  });
  (0, _mocha.describe)('/DELETE Delete an entry', function () {
    (0, _mocha.it)('Should return entry not found', function (done) {
      var notfound2 = '098fcafe-2759-4c1b-957f-2c3baa6b9653';
      var testEntry2 = {
        title: 'hello not found?',
        description: 'my updated description'
      };

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"])["delete"]("/api/v1/entries/".concat(notfound2)).set('auth', token).send(testEntry2).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.have.property('error');
      });

      done();
    });
    (0, _mocha.it)('Should Not Delete Any Entry who gave face id', function (done) {
      var DeleteId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c-fake';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"])["delete"]("/api/v1/entries/".concat(DeleteId2, "/")).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body).to.have.property('error');
      });

      done();
    });
    (0, _mocha.it)('Should should not allow user to delete an entry which is not his/hers', function (done) {
      var DeleteId = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'secondUser@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"])["delete"]("/api/v1/entries/".concat(DeleteId)).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        (0, _chai.expect)(res.body).to.have.property('error');
      });

      done();
    });
    (0, _mocha.it)('Should allow user to successfully delete an entry', function (done) {
      var DeleteId = 'a9dae559-10c1-41c8-936c-18788d61be9c';

      var token = _jsonwebtoken["default"].sign({
        email: 'example@gmail.com'
      }, process.env.SECRET).toString();

      _chai["default"].request(_index["default"])["delete"]("/api/v1/entries/".concat(DeleteId)).set('auth', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(204);
      });

      done();
    });
  });
});