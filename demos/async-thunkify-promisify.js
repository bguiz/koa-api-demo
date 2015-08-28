var co = require('co');
var thunkify = require('thunkify');
var promisify = require('es6-promisify');

callerFunction();

function callerFunction() {
  co(function * () {
    console.log('I am going to yield three callback functions wrapped using thunkify and promisify');
    try {
      var firstResult = yield promisify(asyncUsingPromisify)('foo');
      var secondResult = yield thunkify(secondAsyncUsingThunkify)(firstResult);
      var thirdResult = yield promisify(thirdAsyncUsingPromisify)(secondResult);
      console.log('Here is the result:', thirdResult);
    } catch (err) {
      console.log('There was an error:', err);
    }
  });
}

function asyncUsingPromisify(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'bar');
  }, 300);
}

function secondAsyncUsingThunkify(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'baz');
  }, 300);
}

function thirdAsyncUsingPromisify(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'meh');
  }, 300);
}
