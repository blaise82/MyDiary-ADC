import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import jwt from 'jsonwebtoken';
import app from '../../index';


chai.use(chaiHttp);

describe('USER TESTS V2', () => {
  describe('/POST V2 USER SIGNUP V2', () => {
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
  describe('USER SIGNIN V2', () => {
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

describe('DIARY ENTRY TEST V2', () => {
  describe('/POST /API/V2/ENTRIES (CREATION OF A DIARY ENTRY) V2', () => {
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
  describe('/GET /API/V2/ENTRIES (GETTING ALL ENTRY) V2', () => {
    it('Should not allow user  get all entry without a token (authenticity)', (done) => {
      chai
        .request(app)
        .get('/api/v2/entries')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should not allow user  get all entry with a fake token (wrong secret key use)', (done) => {
      const token = jwt
        .sign({ email: 'example@gmail.com' }, 'fake secret key')
        .toString();
      chai
        .request(app)
        .get('/api/v2/entries')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should not allow user  get all entry with a fake token (wrong email)', (done) => {
      const token = jwt
        .sign({ email: 'fakeEmail@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get('/api/v2/entries')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('Should get all entry of a given user', (done) => {
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get('/api/v2/entries')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
  });
  describe('/GET ENTRY DESCRIPTION(CONTENT) V2', () => {
    it('Should now allow the use of non GUIDs', (done) => {
      const entryIdFinal = '231325343453453452345tggfgdfg';
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v2/entries/${entryIdFinal}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return entry not found one', (done) => {
      const notfound = '8bce732d-9bef-470d-9a7e-8db03af17bbf';
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v2/entries/${notfound}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should not return an entry: Token is not provided', (done) => {
      const trueId = '277f4569-cf63-42d3-9f13-f56e9c7a4200';
      chai
        .request(app)
        .get(`/api/v2/entries/${trueId}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return an entry with the specified ID', (done) => {
      const entryIdFinal = '63835241-9fee-435f-a4ce-2bbb99fc896b';
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get(`/api/v2/entries/${entryIdFinal}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
  });
  describe('/PATCH AN ENTRY  V2', () => {
    it('Should allow a user to update his/her entry', (done) => {
      const entryId = '63835241-9fee-435f-a4ce-2bbb99fc896b';
      const entryUpdate = {
        title: 'new title update',
        description: 'hi i am testing a new entry',
      };
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .patch(`/api/v2/entries/${entryId}`)
        .set('auth', token)
        .send(entryUpdate)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('/DELETE ENTRY  V2', () => {
    it('Should allow a user to delete an entry', (done) => {
      const entryId = '63835241-9fee-435f-a4ce-2bbb99fc896b';
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .delete(`/api/v2/entries/${entryId}`)
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  describe('/GET THE TOTAL  NUMBER OF ENTRIES  V2', () => {
    it('Should allow a user to get the total number of entries', (done) => {
      const token = jwt
        .sign({ email: 'email@gmail.com' }, process.env.SECRET)
        .toString();
      chai
        .request(app)
        .get('/api/v2/entries/total/all')
        .set('auth', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          done();
        });
    });
  });
});
