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
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can signup a user with email and password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ name: 'eve', email: 'eve@evie.com', password: 'Puppies', role: 'user' })
      .then(res => {
       
        expect(res.body).toEqual({
          'success': true,
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTg2MGUyZDc3YTA5OGJiN2YyMTk0ZCIsImlhdCI6MTU3ODY1NTk3MCwiZXhwIjoxNTgxMjQ3OTcwfQ.BsPIb0KmyHZwdZW4MeKiQNMF58PD_e7Vs06vpPHG1pw'
        });
      });
  });
});


