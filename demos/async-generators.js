var co = require('co');

callerFunction();

function callerFunction() {
  co(function * () {
    console.log('I am going to yield three consecutive generator functions');
    try {
      var firstResult = yield asyncUsingGenerator('foo');
      var secondResult = yield secondAsyncUsingGenerator(firstResult);
      var thirdResult = yield thirdAsyncUsingGenerator(secondResult);
      console.log('Here is the result:', thirdResult);
    } catch (err) {
      console.log('There was an error:', err);
    }
  });
}

function asyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'bar');
    }, 300);
  });
}

function secondAsyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'baz');
    }, 300);
  });
}

function thirdAsyncUsingGenerator(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'meh');
    }, 300);
  });
}
