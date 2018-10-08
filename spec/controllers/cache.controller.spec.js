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
      error = new Error({error: 'some error'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      test('returns array of Caches or empty array', () => {
        sinon.stub(Cache, 'find').yields(null, expectedResult);
        CacheController.index(req, res);
        sinon.assert.calledWith(Cache.find, {});
        sinon.assert.calledWith(res.json, sinon.match.array);
      });
    });

    context('when not successful', () => {
      test('returns status 500 on server error', () => {
        sinon.stub(Cache, 'find').yields(error);
        CacheController.index(req, res);
        sinon.assert.calledWith(Cache.find, {});
        sinon.assert.calledWith(res.status, 500);
      });
    });
  });

  describe('show (a cache)', () => {
    let req; let status; let end; let res; let json; let error;
    let expectedResult;
    beforeEach(() => {
      end = sinon.spy();
      json = sinon.spy();
      req = {body: {key: 'badminton'}, params: {key: 'badminton'}};
      status = sinon.stub();
      res = {json, status, end};
      status.returns(res);
      expectedResult = cacheFixtures.firstCache;
      error = new Error({error: 'some error'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      test('returns array of Caches or empty array', () => {
        sinon.stub(Cache, 'findOne').yields(null, expectedResult);

        CacheController.show(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.params.key});
        sinon.assert.calledWith(res.json, sinon.match.string);
      });
    });

    context('when cache does not exist', () => {
      test('creates cache', () => {
        sinon.stub(Cache, 'findOne').yields(null, null);
        sinon.stub(Cache, 'create').yields(null, expectedResult);
        CacheController.show(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.params.key});
        sinon.assert.calledWith(Cache.create, req.params);
        sinon.assert.calledWith(res.status, 201);
      });

      test('throws 422 error when not successful', () => {
        sinon.stub(Cache, 'findOne').yields(null, null);
        sinon.stub(Cache, 'create').yields(error);
        CacheController.show(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.params.key});
        sinon.assert.calledWith(Cache.create, req.params);
        sinon.assert.calledWith(res.status, 422);
      });
    });

    context('when unsuccessful', () => {
      test('throw 500 error', () => {
        sinon.stub(Cache, 'findOne').yields(error);
        CacheController.show(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.params.key});
        sinon.assert.calledWith(res.status, 500);
      });
    });
  });

  describe('create (a cache)', () => {
    let error; let req; let res; let expectedResult; let status;
    beforeEach(() => {
      req = {body: {key: 'badminton'}};
      status = sinon.stub();
      res = {json: sinon.spy(), status, end: sinon.spy()};
      status.returns(res);
      error = new Error({error: 'some error'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when cache key already exists exist', () => {
      expectedResult = {key: 'key', data: 'data'};
      test('returns the cache', () => {
        sinon.stub(Cache, 'findOne').yields(null, expectedResult);

        CacheController.create(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.body.key});
        sinon.assert.calledWith(res.json, sinon.match.string);
      });
    });

    context('when cache does not exist', () => {
      test('creates cache', () => {
        sinon.stub(Cache, 'findOne').yields(null, null);
        sinon.stub(Cache, 'create').yields(null, expectedResult);
        CacheController.create(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.body.key});
        sinon.assert.calledWith(Cache.create, req.body);
        sinon.assert.calledWith(res.status, 201);
      });

      test('throws 422 error when not successful', () => {
        sinon.stub(Cache, 'findOne').yields(null, null);
        sinon.stub(Cache, 'create').yields(error);
        CacheController.create(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.body.key});
        sinon.assert.calledWith(Cache.create, req.body);
        sinon.assert.calledWith(res.status, 422);
      });
    });

    context('when unsuccessful', () => {
      test('throw 500 error', () => {
        sinon.stub(Cache, 'findOne').yields(error);
        CacheController.create(req, res);

        sinon.assert.calledWith(Cache.findOne, {key: req.body.key});
        sinon.assert.calledWith(res.status, 500);
      });
    });
  });

  describe('update (a cache)', () => {
    let error; let req; let res; let expectedResult; let status;
    beforeEach(() => {
      req = { body: { key: 'badminton' } };
      status = sinon.stub();
      res = { json: sinon.spy(), status, end: sinon.spy() };
      status.returns(res);
      error = new Error({ error: 'some error' });
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when cache key update properly', () => {
      expectedResult = { key: 'key', data: 'data' };
      test('returns status 204', () => {
        sinon.stub(Cache, 'findOneAndUpdate').yields(null, expectedResult);

        CacheController.update(req, res);

        sinon.assert.calledWith(res.status, 204);
      });
    });

    context('when cache does not exist', () => {
      test('returns status 404', () => {
        sinon.stub(Cache, 'findOneAndUpdate').yields(null, null);
        sinon.stub(Cache, 'create').yields(null, expectedResult);

        CacheController.update(req, res);

        sinon.assert.calledWith(res.status, 404);
      });
    });

    context('when unsuccessful', () => {
      test('throw 500 error', () => {
        sinon.stub(Cache, 'findOneAndUpdate').yields(error);
        CacheController.update(req, res);

        sinon.assert.calledWith(res.status, 500);
      });
    });
  });

  describe('destroy (a cache)', () => {
    let error; let req; let res; let status;
    beforeEach(() => {
      req = {body: {key: 'badminton'}, params: {key: 'badminton'}};
      status = sinon.stub();
      res = {json: sinon.spy(), end: sinon.spy(), status};
      status.returns(res);
      error = new Error({error: 'some error'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      test('should return status 200', () => {
        sinon.stub(Cache, 'findOneAndDelete').yields(null, {});
        CacheController.destroy(req, res);

        sinon.assert.calledWith(Cache.findOneAndDelete, {key: req.params.key});
        sinon.assert.calledWith(
            res.json, sinon.match(
                {'message': `Cache with key ${req.params.key} deleted!`}
            )
        );
      });
    });

    context('when not existing', () => {
      test('should return status 404', () => {
        sinon.stub(Cache, 'findOneAndDelete').yields(null, null);
        CacheController.destroy(req, res);

        sinon.assert.calledWith(res.status, 404);
      });
    });

    context('when there is an error', () => {
      test('should return status 500', () => {
        sinon.stub(Cache, 'findOneAndDelete').yields(error);
        CacheController.destroy(req, res);

        sinon.assert.calledWith(Cache.findOneAndDelete, {key: req.params.key});
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
      });
    });
  });

  describe('destroy all cache', () => {
    let error; let req; let res; let status;
    beforeEach(() => {
      req = {};
      status = sinon.stub();
      res = {json: sinon.spy(), end: sinon.spy(), status};
      status.returns(res);
      error = new Error({error: 'some error'});
    });

    afterEach(() => {
      sinon.restore();
    });

    context('when successful', () => {
      test('should return status 200', () => {
        sinon.stub(Cache, 'deleteMany').yields(null, {});
        CacheController.destroyAll(req, res);

        sinon.assert.calledWith(Cache.deleteMany, {});
        sinon.assert.calledWith(
            res.json, sinon.match({'message': 'All caches cleared!'}));
      });
    });

    context('when there is an error', () => {
      test('should return status 500', () => {
        sinon.stub(Cache, 'deleteMany').yields(error);
        CacheController.destroyAll(req, res);

        sinon.assert.calledWith(Cache.deleteMany, {});
        sinon.assert.calledWith(res.status, 500);
        sinon.assert.calledOnce(res.status(500).end);
      });
    });
  });
});

