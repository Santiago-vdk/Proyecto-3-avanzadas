'use strict';

module.exports = function(Test) {

  const neo4j = require('neo4j-driver').v1;
  const driver = neo4j.driver("bolt://ec2-174-129-170-28.compute-1.amazonaws.com:7687", neo4j.auth.basic("neo4j", "123456"));
  var session = driver.session();

  Test.status = function(cb) {
    var idCompra = '5a125cfb851575576632ac82';
    var resultPromise = session.readTransaction(function (trans) {
      var result = trans.run(
        'match (compra {_id: \'5a1249c5cbb6e10f0df01e66\'}) return compra');
      return result;
    })
      //'CREATE (a:Person {name: $name}) RETURN a',
      //{name: personName}

    ;

    resultPromise.then(result => {
      session.close();

      var singleRecord = result.records[0];
      var node = singleRecord.get(0);
      console.log(result.records);
      //console.log(result.records[0]._fields[0].start.properties);
      // on application exit:
      driver.close();
      cb(null, result.records[0]._fields[0].start.properties);
    });
  };

  Test.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get'
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );

};
