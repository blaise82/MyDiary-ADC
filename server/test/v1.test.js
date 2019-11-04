import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
describe('Server Config Check', () => {
  it('Should return Server Is On', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res);
        done();
      });
  });
  it('Should return Bad Request(400 wrong route)', (done) => {
    chai
      .request(app)
      .get('/wrong')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('User Tests', () => {
  describe('/POST User SignUp', () => {
    it('Should Not Allow A User To SignUp With Invalid: firstname', (done) => {
      const testData2 = {
        firstname: '',
        lastname: 'lastname',
        email: 'userEmail@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should Not Allow A User To SignUp With Invalid: lastname', (done) => {
      const testData3 = {
        firstname: 'firstname',
        lastname: '',
        email: 'userEmail',
        password: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData3)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should Not Allow A User To SignUp With Invalid: email', (done) => {
      const testData4 = {
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'userEmail',
        password: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData4)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should Not Allow A User To SignUp With A Weak password', (done) => {
      const testData5 = {
        firstname: 'firstname',
        lastname: 'basename',
        email: 'userEmail@gmail.com',
        password: 'password',
      };

      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData5)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signup if user email already exist', (done) => {
      const testData6 = {
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'example@gmail.com',
        password: 'Password@100',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData6)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should not allow a user to signup with a weak password', (done) => {
      const testData7 = {
        firstname: 'firstNameTest',
        lastname: 'lastNameTest',
        email: 'exampleTest@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testData7)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should allow a user to signup', (done) => {
      const testData7 = {
        firstname: 'firstNameTest',
        lastname: 'lastNameTest',
        email: 'exampleTest@gmail.com',
        password: 'PasswordTest@100',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testData7)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });

  describe('User Signin', () => {
    it('Should NOT allow a user to signin without providing an email and a password ', (done) => {
      const testData8 = {
        password: 'Password@100',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testData8)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should NOT allow a user to signin: Email not found', (done) => {
      const testData9 = {
        email: 'testEmail@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData9)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin: Incorrect password', (done) => {
      const testData10 = {
        email: 'example@gmail.com',
        password: 'wrongPassword',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData10)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin without providing a password (empty or missing password ) ', (done) => {
      const testData11 = {
        email: 'example@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData11)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin without providing an email (empty or missing email ) ', (done) => {
      const testData12 = {
        password: 'Password@100',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData12)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin extra data ) ', (done) => {
      const testData12 = {
        email: 'example@gmail.com',
        password: 'Password@100',
        extra: 'hello there i am extra data',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData12)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should allow a user to signin', (done) => {
      const testData13 = {
        email: 'example@gmail.com',
        password: 'Password@100',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(testData13)
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
});

describe('Diary Entry test', () => {
  describe('/POST /api/v1/entries (creation of a diary entry)', () => {
    it('Should NOT Allow user to create an entry without title data', (done) => {
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      const entryTestData1 = {
        description: 'my description',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('auth', token)
        .send(entryTestData1)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT Allow user to create an entry without description data', (done) => {
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      const entryTestData2 = {
        title: 'my title',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('auth', token)
        .send(entryTestData2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT Allow user to create an entry with invalid no data', (done) => {
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('auth', token)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT Allow user to create a new diary entry without a login token (logged in user)', (done) => {
      const entryTestData4 = {
        title: 'diary',
        description: 'Updated description',
      };
      chai
        .request(app)
        .post('/api/v1/entries')
        .send(entryTestData4)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT Allow user to create a new diary entry with token fake token(fake email)', (done) => {
      const entryTestData5 = {
        title: 'Updated title',
        description: 'Updated description',
      };
      const token = jwt
        .sign({ email: 'invalid@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('auth', token)
        .send(entryTestData5)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should Allow user to  create an new diary entry', (done) => {
      const entryTestData = {
        title: 'new title',
        description: 'hi i am testing a new entry',
      };

      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .post('/api/v1/entries')
        .set('auth', token)
        .send(entryTestData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
  describe('/Get /api/v1/entries (Getting All entry)', () => {
    it('should not allow user  get all entry without a token (authenticity)', (done) => {
      chai
        .request(app)
        .get('/api/v1/entries')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should not allow user  get all entry with a fake token (wrong secret key use)', (done) => {
      const token = jwt
        .sign({ email: 'example@gmail.com' }, 'fake secret key')
        .toString();
      chai
        .request(app)
        .get('/api/v1/entries')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should not allow user  get all entry with a fake token (wrong email)', (done) => {
      const token = jwt
        .sign({ email: 'fakeEmail@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get('/api/v1/entries')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should get all entry of a given user', (done) => {
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get('/api/v1/entries')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
  });

  describe('/Get Entry description(Content)', () => {
    it('Should now allow the use of non GUIDs', (done) => {
      const entryIdFinal = '231325343453453452345tggfgdfg';
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v1/entries/${entryIdFinal}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return entry not found', (done) => {
      const notfound = '098fcafe-2759-4c1b-957f-2c3baa6b9653';
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v1/entries/${notfound}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should not return an entry: Token is not provided', (done) => {
      const trueId = '2dc431bf-5af5-40c4-9f52-75a2c8939b42';
      chai
        .request(app)
        .get(`/api/v1/entries/${trueId}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should not return an entry : entry does not belong to you', (done) => {
      const trueId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const token = jwt
        .sign({ email: 'secondUser@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v1/entries/${trueId2}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return an entry with the specified ID', (done) => {
      const entryIdFinal = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v1/entries/${entryIdFinal}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
  });
  describe('/patch Modify an entry', () => {
    it('Should return entry not found', (done) => {
      const notfound2 = '098fcafe-2759-4c1b-957f-2c3baa6b9653';
      const testEntry2 = {
        title: 'hello not found?',
        description: 'my updated description',
      };
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .patch(`/api/v1/entries/${notfound2}`)
        .set('auth', token)
        .send(testEntry2)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
        });
      done();
    });
    it('Should Not Modify an Entry With no Title Provided', (done) => {
      const testEntry2 = {
        description: 'my updated description',
      };
      const entryId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .patch(`/api/v1/entries/${entryId2}`)
        .set('auth', token)
        .send(testEntry2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
        });
      done();
    });

    it('Should Not Modify an Entry With no description Provided', (done) => {
      const testEntry3 = {};
      const entryId2 = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .patch(`/api/v1/entries/${entryId2}`)
        .set('auth', token)
        .send(testEntry3)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
        });
      done();
    });

    it('Should Not Allow User To Modify An Entry Which Is Not His/Hers', (done) => {
      const entryId4 = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const token = jwt
        .sign({ email: 'secondUser@gmail.com' }, process.env.SECRET)
        .toString();
      const testEntry5 = {
        title: 'Updated Title',
        description: 'Updated description',
      };
      chai
        .request(app)
        .patch(`/api/v1/entries/${entryId4}`)
        .set('auth', token)
        .send(testEntry5)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should Not Allow Modification Without An Authentication (No Login)', (done) => {
      const entryId6 = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const testEntry6 = {
        title: 'Updated Title',
        description: 'Updated description',
      };
      const token = '';
      chai
        .request(app)
        .patch(`/api/v1/entries/${entryId6}`)
        .set('auth', token)
        .send(testEntry6)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should successfully modify Entry', (done) => {
      const testEntry = {
        title: 'My updated title',
        description: 'my updated description',
      };
      const entryId = 'a9dae559-10c1-41c8-936c-18788d61be9c';
      const token = jwt
        .sign({ email: 'example@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .patch(`/api/v1/entries/${entryId}`)
        .set('auth', token)
        .send(testEntry)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
