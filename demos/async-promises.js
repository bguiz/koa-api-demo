callerFunction();

function callerFunction() {
  console.log('I am going to call three chained promise functions');
  asyncUsingPromise('foo')
    .then(secondAsyncUsingPromise)
    .then(thirdAsyncUsingPromise)
    .then(function(result) {
      console.log('Here is the result:', result);
    })
    .catch(function(err) {
      console.log('There was an error:', err);
    });
}

function asyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'bar');
    }, 300);
  });
}

function secondAsyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'baz');
    }, 300);
  });
}

function thirdAsyncUsingPromise(input) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(input+'meh');
    }, 300);
  });
}
