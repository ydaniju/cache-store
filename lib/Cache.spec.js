const expect = require('chai').expect;
const Cache = require('./Cache');

describe('Cache', () => {
  it('should be invalid if key is empty', (done) => {
    const cache = new Cache({ data: 'random' });

    cache.validate((err) => {
      expect(err.errors.key).to.exist;
      done();
    });
  });

  it('should be invalid if data is empty', (done) => {
    const cache = new Cache({ key: 'lost' });

    cache.validate((err) => {
      expect(err.errors.data).to.exist;
      done();
    });
  });
});

