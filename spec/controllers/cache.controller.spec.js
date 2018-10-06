const sinon = require('sinon');
const CacheController = require('../../app/controllers/cache.controller');
const Cache = require('../../app/models/cache.model');
const cacheFixtures = require('../fixtures/cache.fixture');
const context = describe;

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
      expectedResult = [cacheFixtures.firstCache];
      error = new Error({error: 'blah blah'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      it('returns array of Caches or empty array', () => {
        sinon.stub(Cache, 'find').yields(null, expectedResult);
        CacheController.getAll(req, res);
        sinon.assert.calledWith(Cache.find, {});
        sinon.assert.calledWith(res.json, sinon.match.array);
      });
    });

    context('when not successful', () => {
      it('returns status 500 on server error', () => {
        sinon.stub(Cache, 'find').yields(error);
        CacheController.getAll(req, res);
        sinon.assert.calledWith(Cache.find, {});
        sinon.assert.calledWith(res.status, 500);
      });
    });
  });

  describe('create cache', () => {
    let error; let req; let res; let expectedResult;
    beforeEach(() => {
      req = {key: 'badminton'};
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({end: sinon.spy()}),
      };
      error = new Error({error: 'blah blah'});
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return created Cache obj', () => {
      expectedResult = req.body;
      sinon.stub(Cache, 'create').yields(null, expectedResult);
      CacheController.create(req, res);
      sinon.assert.calledWith(Cache.create, req.body);
      sinon.assert.calledWith(res.json, sinon.match({key: req.body.key}));
      sinon.assert
          .calledWith(res.json, sinon.match.string({data: req.body.data}));
    });

    it('should return status 500 on server error', () => {
      sinon.stub(Cache, 'create').yields(error);
      CacheController.create(req, res);
      sinon.assert.calledWith(Cache.create, req.body);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.status(500).end);
    });
  });
});

