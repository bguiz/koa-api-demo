var co = require('co');
var supertestAsPromised = require('supertest-as-promised');
var chai = require('chai');

var server = require('../lib/server.js');

var supertest = supertestAsPromised(Promise);
var request = supertest.agent(server.listen());
var expect = chai.expect;

describe('[hello]', function() {
  it('should say hello world', function(done) {
    co(function *() {
      yield request
        .get('/api/v1/hello')
        .expect(200)
        .expect({
          hello: 'world!',
        });
    }).then(done, done);
  });
});
