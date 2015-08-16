var koa = require('koa');
var koaRouter = require('koa-router');

var server = koa();

var port = 4200;
server.listen(port);
console.log('http://localhost:'+port);

module.exports = server;
