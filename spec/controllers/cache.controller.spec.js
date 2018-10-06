const sinon = require('sinon');
const CacheController = require('../../app/controllers/cache.controller');
const Cache = require('../../app/models/cache.model');

describe('Cache Controller', () => {
  describe('index (get all caches)', () => {
    let req; let status; let end; let res; let json; let error;
    let expectedResult;
    beforeEach(() => {
      end = sinon.spy();
      json = sinon.spy();
      req = {};
      status = sinon.stub();
      res = {json, status, end};
      status.returns(res);
      expectedResult = [{}, {}, {}];
      error = new Error({error: 'blah blah'});
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return array of Caches or empty array', () => {
      sinon.stub(Cache, 'find').yields(null, expectedResult);
      CacheController.getCaches(req, res);
      sinon.assert.calledWith(Cache.find, {});
      sinon.assert.calledWith(res.json, sinon.match.array);
    });

    it('should return status 500 on server error', () => {
      sinon.stub(Cache, 'find').yields(error);
      CacheController.getCaches(req, res);
      sinon.assert.calledWith(Cache.find, {});
      sinon.assert.calledWith(res.status, 500);
    });
  });
});

