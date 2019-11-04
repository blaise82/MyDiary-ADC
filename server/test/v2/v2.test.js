import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import app from '../../index';


chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('User Tests', () => {
  describe('/POST v2 User SignUp', () => {
    it('Should Not Allow A User To SignUp With Invalid: firstname', (done) => {
      const testData2 = {
        firstname: '',
        lastname: 'lastname',
        email: 'exampleTest@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
        .send(testData4)
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
        email: 'email@gmail.com',
        password: 'Password@100',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(testData6)
        .end((err, res) => {
          expect(res).to.have.status(401);
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
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signin')
        .send(testData9)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin: Incorrect password', (done) => {
      const testData10 = {
        email: 'email@gmail.com',
        password: 'wrongPassword',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(testData10)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin without providing a password (empty or missing password ) ', (done) => {
      const testData11 = {
        email: 'email@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signin')
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
        .post('/api/v2/auth/signin')
        .send(testData12)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should NOT allow a user to signin extra data ) ', (done) => {
      const testData12 = {
        email: 'email@gmail.com',
        password: 'Password@100',
        extra: 'hello there i am extra data',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(testData12)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should allow a user to signin', (done) => {
      const testData13 = {
        email: 'email@gmail.com',
        password: 'Password@100',
      };
      chai
        .request(app)
        .post('/api/v2/auth/signin')
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
  describe('/POST /api/v2/entries (creation of a diary entry)', () => {
    it('Should NOT Allow user to create an entry without title data', (done) => {
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      const entryTestData1 = {
        description: 'my description',
      };
      chai
        .request(app)
        .post('/api/v2/entries')
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
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      const entryTestData2 = {
        title: 'my title',
      };
      chai
        .request(app)
        .post('/api/v2/entries')
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
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .post('/api/v2/entries')
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
        .post('/api/v2/entries')
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
        .post('/api/v2/entries')
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
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .post('/api/v2/entries')
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
});
