var promisify = require('es6-promisify');

callerFunction();

async function callerFunction() {
  console.log('I am going to await three async functions');
  try {
    var firstResult = await asyncUsingPromise('foo');
    var secondResult = await promisify(secondAsyncUsingThunkify)(firstResult);
    var thirdResult = await promisify(thirdAsyncUsingPromisify)(secondResult);
    console.log('Here is the result:', thirdResult);
  } catch (err) {
    console.log('There was an error:', err);
  }
}

function asyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'bar');
    }, 300);
  });
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
