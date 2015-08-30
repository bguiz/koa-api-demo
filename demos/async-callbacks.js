callerFunction();

function callerFunction() {
  console.log('I am going to call three nested callback functions');
  asyncUsingCallbackFunction('foo', function errBackFunction(err, result) {
    if (!!err) {
      console.log('There was an error:', err);
    }
    else {
      secondAsyncUsingCallbackFunction(result, function errBackFunction(err, result) {
        if (!!err) {
          console.log('There was an error:', err);
        }
        else {
          thirdAsyncUsingCallbackFunction(result, function errBackFunction(err, result) {
            if (!!err) {
              console.log('There was an error:', err);
            }
            else {
              console.log('Here is the result:', result);
            }
          });
        }
      });
    }
  });
}

function asyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'bar');
  }, 300);
}

function secondAsyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'baz');
  }, 300);
}

function thirdAsyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'meh');
  }, 300);
}
