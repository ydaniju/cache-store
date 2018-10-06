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

  describe('create a cache', () => {
    let error; let req; let res; let expectedResult; let status;
    beforeEach(() => {
      req = {body: {key: 'badminton'}};
      status = sinon.stub();
      res = {json: sinon.spy(), status};
      status.returns(res);
      error = new Error({error: 'blah blah'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      it('should return created Cache obj', () => {
        expectedResult = req.body;
        sinon.stub(Cache, 'create').yields(null, expectedResult);
        CacheController.create(req, res);
        sinon.assert.calledWith(Cache.create, req.body);
        sinon.assert.calledWith(res.json, sinon.match({key: req.body.key}));
      });
    });

    context('when not successful', () => {
      it('should return status 422 on server error', () => {
        sinon.stub(Cache, 'create').yields(error);
        CacheController.create(req, res);
        sinon.assert.calledWith(Cache.create, req.body);
        sinon.assert.calledWith(res.status, 422);
      });
    });
  });

  describe('destroy a cache', () => {
    let error; let req; let res; let status;
    beforeEach(() => {
      req = {body: {key: 'badminton'}, params: {key: 'badminton'}};
      status = sinon.stub();
      res = {json: sinon.spy(), end: sinon.spy(), status};
      status.returns(res);
      error = new Error({error: 'blah blah'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      it('should return status 200', () => {
        sinon.stub(Cache, 'findOneAndDelete').yields(null, {});
        CacheController.destroy(req, res);

        sinon.assert.calledWith(Cache.findOneAndDelete, {key: req.params.key});
        sinon.assert.calledWith(
            res.json, sinon.match({'message': 'Cache deleted!'}));
      });
    });

    context('when not existing', () => {
      it('should return status 404', () => {
        sinon.stub(Cache, 'findOneAndDelete').yields(null, null);
        CacheController.destroy(req, res);

        sinon.assert.calledWith(res.status, 404);
      });
    });

    context('when there is an error', () => {
      it('should return status 500', () => {
        sinon.stub(Cache, 'findOneAndDelete').yields(error);
        CacheController.destroy(req, res);

        sinon.assert.calledWith(Cache.findOneAndDelete, {key: req.params.key});
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
      });
    });
  });
});

