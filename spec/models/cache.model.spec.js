const mongoose = require('mongoose');
const config = require('../../config');
const Cache = require('../../app/models/cache.model');

beforeAll(() => {
  // connecting MongoDB using mongoose to our application
  mongoose.set('useCreateIndex', true);
  mongoose.connect(config.db, { useNewUrlParser: true });
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

  test('when max count exceeded', (done) => {
    Cache.create({key: 'play'}, (err, oldCache) => {
    });
    const cache = new Cache({ key: 'lost' });
    console.log(process.env.MAX_CACHE_LIMIT)
    cache.save((err) => {
      expect(err).toBeFalsy();
      expect(cache.expires).toBeDefined();
      done();
    });
  });
});
