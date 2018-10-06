process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const context = describe;

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
          {
            id: 4,
            key: 'valhala',
            data: '$dhgddh$BjkhjfHd',
            expires: new Date(),
          },
          {
            id: 7,
            key: 'logorhea',
            data: '$bdb$BHd',
            expires: new Date(),
          },
          {
            id: 8,
            key: 'slobodan',
            data: '$6bdbd$778333',
            expires: new Date(),
          },
        ];
        this.get = sinon.stub(request, 'get');
      });

      afterEach(() => {
        request.get.restore();
      });

      it('should return all caches', (done) => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('/caches', (err, res, body) => {
          const parsedBody = JSON.parse(body);
          // there should be a 200 status code
          expect(res.statusCode).to.eql(200);
          expect(parsedBody.length).to.eql(3);
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

      it('returns status 500', (done) => {
        this.get.yields(null, responseObject, JSON.stringify(responseBody));
        request.get('/caches', (err, res, body) => {
          // there should be a 200 status code
          expect(res.statusCode).to.eql(500);
          done();
        });
      });
    });
  });
});
