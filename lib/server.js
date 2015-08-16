var koa = require('koa');
var koaRouter = require('koa-router');

var server = koa();

var helloRouter = koaRouter({
  prefix: '/api/v1/hello',
});

helloRouter
  .get('helloWorld', '/', getHelloWorld);

function *getHelloWorld() {
  if (false) {
    (function() {
      console.log('This statement never gets reached');
    })();
  }
  this.response.body = {
    hello: 'world!',
  };
  this.response.status = 200;
}

server
  .use(helloRouter.routes())
  .use(helloRouter.allowedMethods());

var port = 4200;
server.listen(port);
console.log('http://localhost:'+port);

module.exports = server;
