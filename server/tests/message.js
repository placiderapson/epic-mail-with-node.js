import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';

import database from '../db';
import server from '../index';
import {
  newUser4,
  newUser5,
  newUserLogIn4,
  newUserLogIn5,
  message,
  message2,
  admin,
  draftEmail,
  draftEmail2,
  message3,
  message4,
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('MESSAGE ENDPOINT TESTS', () => {
  let userToken1;
  let userToken2;
  let adminToken;

  it('Should register a fourth user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser4)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equals('User registered');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should register a fifth new user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser5)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equals('User registered');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should login the fourth user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn4)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken1 = `Bearer ${res.body.data.token}`;

        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should login the fifth user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn5)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken2 = `Bearer ${res.body.data.token}`;

        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should login the admin', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(admin)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        adminToken = `Bearer ${res.body.data.token}`;

        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should send an email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should send an email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should not send this email because the receiver is not registered', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message3)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('the receiver is not registered');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not send this email because the sender and receiver emails are the same', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message4)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equals('the sender and receiver email must not be the same');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should send a draft email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should send a draft email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should retrieve received emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent email of id 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent email of id 2', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/2')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve sent email of id 6 because it does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve sent email of id 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve sent email of id 6 because it does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve sent email of id 2', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/2')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received email of id 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, received email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received email of id 2', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('received email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received email of id 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('received email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft email of id 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, draft email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve draft email of id 6 because it does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve draft emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft email of id 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('draft email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve draft email of id 6 because it does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve draft emails', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('your draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft email of id 2', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/2')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('draft email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send an email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should send an email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should send a draft email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should send a draft email', (done) => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 3', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('received email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 1', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('received email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 4', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/4')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('received email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete received email of id = 4 because it does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 2', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);

        res.body.should.have.property('message').equals('received email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete received email of id = 6 because it does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 2', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/2')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('sent email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete sent email of id = 6 because it does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 1', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('sent email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete sent email of id = 6 because it does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 2', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/2')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('draft email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 1', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('draft email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 3', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('draft email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 4', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/4')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('draft email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve draft emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, no draft emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve draft emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('sorry! you have no draft emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve unread emails they have been read', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, no unread emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve unread emails because they have been read', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('sorry! you have no unread emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve read emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, no read emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve read emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('sorry! you have read no emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 3', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('sent email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 4', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/4')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('sent email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve sent emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, no sent emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve sent emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('sorry! you have sent no emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received email of id 1 because it will have been deleted or does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received email of id 1 because it will have been deleted or does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete draft email of id = 6 because it does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete draft email of id = 6 because it does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, received emails not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received emails because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('received emails not found');
        res.body.should.be.a('object');
        done();
      });
  });

  database.query(
    'TRUNCATE TABLE receivedemails CASCADE; ALTER SEQUENCE receivedemails_id_seq RESTART WITH 1;'
  );
  database.query(
    'TRUNCATE TABLE sentemails CASCADE; ALTER SEQUENCE sentemails_id_seq RESTART WITH 1;'
  );
  database.query(
    'TRUNCATE TABLE draftemails CASCADE; ALTER SEQUENCE draftemails_id_seq RESTART WITH 1;'
  );
});
