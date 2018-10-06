const expect = require('chai').expect;
const Cache = require('../../app/models/cache.model');

describe('Cache', () => {
  it('should be invalid if key is empty', (done) => {
    const cache = new Cache({key: null, data: 'random', expires: 123});

    cache.validate((err) => {
      expect(err.errors.key).to.exist;
      done();
    });
  });

  it('should be invalid if data and key are empty', (done) => {
    const cache = new Cache({key: null, data: null, expires: 123});

    cache.validate((err) => {
      expect(err.errors.data).to.exist;
      done();
    });
  });

  it('should be invalid if expires is empty', (done) => {
    const cache = new Cache({key: 'lost', data: null, expires: null});

    cache.validate((err) => {
      expect(err.errors.expires).to.exist;
      done();
    });
  });

  it('sets `data` when valid', (done) => {
    const cache = new Cache({key: 'lost'});

    cache.validate((err) => {
      expect(err).to.not.exist;
      expect(cache.data).to.exist;
      done();
    });
  });

  it('sets `expires` on initialize', (done) => {
    const cache = new Cache({key: 'lost'});

    expect(cache.expires).to.exist;
    done();
  });
});
