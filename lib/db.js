var monk = require('monk');
var coMonk = require('co-monk');

var db = monk('localhost/koa-api-demo');

function getEntityTable(entityName) {
  var entityTable = coMonk(db.get(entityName));
  return entityTable;
}

module.exports = {
  db,
  getEntityTable,
};
