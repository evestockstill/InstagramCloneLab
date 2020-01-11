require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const controllers = require('../lib/controller/auth');
const User = require('../lib/models/User');

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

  let token;
  let user;
  let password;

  beforeAll((done) => {
    request(app)
      .post('/login')
      .send({
        name: user,
        password: password,
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
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

    it('It responds with JSON', () => {
      return request(app)
        .get('/api/v1/auth')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res.type).toBe('application/json');
        });
    });

    it('can login a user with email and password', async () => {
      const user = await User.create({
        name: 'eve',
        email: 'eve@evie.com',
        password: 'Puppies',
      });
      return request(app)
        .post('/api/v1/auth/login')
        .send({ name: 'eve', email: 'eve@evie.com', password: 'Puppies' })
        .then(res => {
          expect(res.type).toBe('application/json');
        });
    });
  });
  // it('fails when a bad email is used', async() => {
  //   await User.create({ name: 'eve', email: 'eve@evie.com', password: 'Puppies' });
  //   return request(app)
  //     .post('/api/v1/auth/login')
  //     .send({ email: 'eve@eve.com', password: 'Puppies' })
  //     .then(res => {
  //       expect(res.status).toEqual(500); 
  //     });
  // });
  it('fails when a bad password is used', async() => {
    await User.create({ name: 'eve', email: 'eve@evie.com', password: 'Puppies' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ name: 'eve', email: 'eve@evie.com', password: 'Puppy', role: 'user' })
      .then(res => {
        expect(res.status).toEqual(500);
        expect(res.body).toEqual({
          status: 500,
          message: 'invalid email or password'
        });
      });
  });
  // it('can verify if a user is logged in', async() => {
  //   const user = await User.create({
  //     name: 'eve',
  //     email: 'eve@evie.com',
  //     password: 'Puppies',
  //   });

  //   const agent = request.agent(app);
  //   await agent
  //     .post('/api/v1/auth/login')
  //     .send({ name: 'eve', email: 'eve@evie.com', password: 'Puppies' });
  //   return agent
  //     .get('/api/v1/auth/verify')
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: user.id,
  //         email: 'eve@evie.com',
  //         __v: 0
  //       });
  //     });
  // });
});




