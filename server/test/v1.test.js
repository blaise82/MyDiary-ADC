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
