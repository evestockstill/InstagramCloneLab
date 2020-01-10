require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  let token;
  let user;
  let pw;

  beforeEach((done) => {
    request(app)
      .post('/login')
      .send({
        username: user,
        password: pw,
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
    afterAll(() => {
      return mongoose.connection.close();
    });
  });
  describe('GET /', () => {
    // token not being sent - should respond with a 401
    test('It should require authorization', () => {
      return request(app)
        .get('/')
        .then((response) => {
          expect(response.statusCode).toBe(404);
        });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
      return request(app)
        .get('/api/v1/auth')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.type).toBe('application/json');
        });
    });
  });
});

