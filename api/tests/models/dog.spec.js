const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });

      it('should throw an error if name type is invalid', async () => {
        Dog.create({ name: 123 })
        .then(() => done(new Error('Name requires a valid type')))
        .catch(() => done());
      });
    });

    describe('min_height', () => {
      it('should throw an error if min_height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid min_height')))
          .catch(() => done());
      });
      it('should work when its a valid min_height', () => {
        Dog.create({ min_height: 40 });
      });
    });

    describe('max_height', () => {
      it('should throw an error if max_height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid max_height')))
          .catch(() => done());
      });
      it('should work when its a valid max_height', () => {
        Dog.create({ max_height: 50 });
      });
    });

    describe('min_weight', () => {
      it('should throw an error if min_weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid min_weight')))
          .catch(() => done());
      });
      it('should work when its a valid min_weight', () => {
        Dog.create({ min_weight: 30 });
      });
    });

    describe('max_weight', () => {
      it('should throw an error if max_weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid max_weight')))
          .catch(() => done());
      });
      it('should work when its a valid max_weight', () => {
        Dog.create({ max_weight: 80 });
      });
    });
  });
});
