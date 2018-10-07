const Cache = require('../../app/models/cache.model');

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
});
