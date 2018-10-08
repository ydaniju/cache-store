const mongoose = require('mongoose');
const sinon = require('sinon');
const context = describe;
const config = require('../../config');
const Cache = require('../../app/models/cache.model');

beforeAll(() => {
  // connecting MongoDB using mongoose to our application
  mongoose.set('useCreateIndex', true);
  mongoose.connect(config.db, {useNewUrlParser: true});
});
afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => {
      done();
    });
  });
});

describe('Cache', () => {
  test('should be invalid if key is empty', (done) => {
    const cache = new Cache({key: null, data: 'random', expires: 123});

    cache.validate((err) => {
      expect(err.errors.key).toBeDefined();
      done();
    });
  });

  test('should be invalid if data and key are empty', (done) => {
    const cache = new Cache({key: null, data: null, expires: 123});

    cache.validate((err) => {
      expect(err.errors.data).toBeDefined();
      done();
    });
  });

  test('should be invalid if expires is empty', (done) => {
    const cache = new Cache({key: 'lost', data: null, expires: null});

    cache.validate((err) => {
      expect(err.errors.expires).toBeDefined();
      done();
    });
  });

  test('sets `data` when valid', (done) => {
    const cache = new Cache({key: 'lost'});

    cache.validate((err) => {
      expect(err).toBeFalsy();
      expect(cache.data).toBeDefined();
      done();
    });
  });

  test('sets `expires` on initialize', (done) => {
    const cache = new Cache({key: 'lost'});

    expect(cache.expires).toBeDefined();
    done();
  });

  describe('before save', () => {
    afterEach(() => {
      sinon.restore();
    });

    test('deletes one cache when max count exceeded', (done) => {
      Cache.create({key: 'random'}, (err, oldCache) => {
        sinon.stub(Cache, 'findOne').yields(null, oldCache);
        const newCache = new Cache({key: 'lost'});
        sinon.stub(Cache, 'countDocuments').yields(null, 5);

        newCache.save((err) => {
          expect(oldCache).toBeDefined();
          done();
        });
      });
    });
  });

  describe('after findOne', () => {
    afterEach(() => {
      sinon.restore();
    });

    context('when cache is expired', () => {
      test('reset expires if cache is expired', (done) => {
        Cache.create({key: 'random'}, (err, oldCache) => {
          oldCache.expires = Date.now() - 2000 * 60 * 60;

          Cache.findOne({key: oldCache.key}, (err, newCache) => {
            expect(oldCache.expires).not.toEqual(newCache.expires);
          });
          done();
        });
      });
    });

    context('when cache is not expired', () => {
      test('does not reset old cache', (done) => {
        Cache.create({key: 'random2'}, (err, oldCache) => {
          Cache.findOne({key: oldCache.key}, (err, newCache) => {
            expect(oldCache.expires).toEqual(newCache.expires);
          });
          done();
        });
      });
    });

    context('when cache is not found matching', () => {
      test('return null cache', (done) => {
        Cache.findOne({key: 'non-existent'}, (err, cache) => {
          expect(cache).toBe(null);
          done();
        });
      });
    });
  });
});
