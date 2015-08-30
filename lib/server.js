var koa = require('koa');
var koaRouter = require('koa-router');

/**
 * @module  Autodocs
 */

var server = koa();

var helloRouter = koaRouter({
  prefix: '/api/v1/hello',
});

helloRouter
  .get('helloWorld', '/', getHelloWorld);

/**
 * Koa middleware that always returns the same thing:
 *
 *     { "hello": "world!" }
 * @method  getHelloWorld
 * @for  Server
 * @yield {undefined} (returns immediately)
 */
function *getHelloWorld() {
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
