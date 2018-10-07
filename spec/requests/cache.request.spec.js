process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const request = require('request');
const context = describe;

const cacheFixtures = require('../fixtures/cache.fixture');

describe('caches requests', () => {
  let responseBody; let responseObject;

  describe('GET /caches', () => {
    context('when successful', () => {
      beforeEach(() => {
        responseObject = {
          statusCode: 200,
          headers: {
            'content-type': 'application/json',
          },
        };
        responseBody = [
          cacheFixtures.firstCache,
          cacheFixtures.secondCache,
          cacheFixtures.thirdCache,
        ];
        this.get = sinon.stub(request, 'get');
      });

      afterEach(() => {
        request.get.restore();
      });

      test('should return all caches', (done) => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('/caches', (err, res, body) => {
          const parsedBody = JSON.parse(body);
          // there should be a 200 status code
          expect(res.statusCode).toBe(200);
          expect(parsedBody.length).toBe(3);

          done();
        });
      });
    });

    context('when not successful', () => {
      beforeEach(() => {
        responseObject = {
          statusCode: 500,
        };
        this.get = sinon.stub(request, 'get');
      });

      afterEach(() => {
        request.get.restore();
      });

      test('returns status 500', (done) => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('/caches', (err, res, body) => {
          // there should be a 500 status code
          expect(res.statusCode).toBe(500);

          done();
        });
      });
    });
  });

  describe('POST /caches', () => {
    context('when successful', () => {
      beforeEach(() => {
        responseObject = {
          statusCode: 201,
          headers: {
            'content-type': 'application/json',
          },
        };
        responseBody = {expires: '2018-10-0', key: 'mahjdhd', data: 'a335e33c'};
        this.post = sinon.stub(request, 'post');
      });

      afterEach(() => {
        request.post.restore();
      });

      test('should return all caches', (done) => {
        this.post.yields(null, responseObject, JSON.stringify(responseBody));
        request.post('/caches', (err, res, body) => {
          const parsedBody = JSON.parse(body);

          expect(res.statusCode).toBe(201);
          expect(parsedBody.data).toBe('a335e33c');

          done();
        });
      });
    });

    context('when not successful', () => {
      beforeEach(() => {
        responseObject = {
          statusCode: 422,
        };
        this.post = sinon.stub(request, 'post');
      });

      afterEach(() => {
        request.post.restore();
      });

      test('returns status 422', (done) => {
        this.post.yields(null, responseObject, JSON.stringify(responseBody));
        request.post('/caches', (err, res, body) => {
          expect(res.statusCode).toBe(422);
          done();
        });
      });
    });
  });
});
