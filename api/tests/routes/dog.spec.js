/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  min_height: 10,
  max_height: 40,
  min_weight: 60,
  max_weight: 80,
};

describe('routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });

  describe('GET /dogs/:id', () => {
    it('should get 200', () =>
      agent.get('/dogs/1').expect(200)
    );
    it('if the id does not exist should get 404', () =>
      agent.get('/dogs/asd').expect(404)
    );
  });

  describe('GET /temperaments', () => {
    it('should get 200', () =>
      agent.get('/temperaments').expect(200)
    );
  });
});
