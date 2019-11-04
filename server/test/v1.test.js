import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
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
});
