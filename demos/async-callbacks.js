callerFunction();

function callerFunction() {
  console.log('I am going to call a callback function');
  asyncUsingCallbackFunction('foo', function errBackFunction(err, result) {
    if (!!err) {
      console.log('There was an error:', err);
    }
    else {
      console.log('Here is the result:', result);
    }
  });
}

function asyncUsingCallbackFunction(input, callback) {
  setTimeout(function() {
    callback(undefined, input+'bar');
  }, 1000);
}
