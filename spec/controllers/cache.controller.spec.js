const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
require('sinon-mongoose');

const CacheController = require('../../app/controllers/cache.controller');
const Cache = require('../../app/models/cache.model');

describe('Cache Controller', () => {
  describe('index (get all caches)', () => {
    beforeEach(() => {
      req = {};
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ end: sinon.spy() })
      };
      expectedResult = [{}, {}, {}];
      error = new Error({ error: "blah blah" });
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return array of Caches or empty array', () => {
      sinon.stub(Cache, 'find').yields(null, expectedResult);
      CacheController.GetCaches(req, res);
      sinon.assert.calledWith(Cache.find, {});
      sinon.assert.calledWith(res.json, sinon.match.array);
    });

    it('should return status 500 on server error', () => {
      sinon.stub(Cache, 'find').yields(error);
      CacheController.GetCaches(req, res);
      sinon.assert.calledWith(Cache.find, {});
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.status(500).end);
    });
  });
});

