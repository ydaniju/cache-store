var expect = require('chai').expect;
var Cache = require('./Cache');

describe('Cache', () => {
  it('should be invalid if key is empty', (done) => {
    var cache = new Cache({ data: 'random' });

    cache.validate((err) => {
      expect(err.errors.key).to.exist;
      done();
    });
  });
});

