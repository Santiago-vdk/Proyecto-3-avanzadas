'use strict';

module.exports = function(Test) {



  const neo4j = require('neo4j-driver').v1;

  const driver = neo4j.driver("bolt://ec2-174-129-170-28.compute-1.amazonaws.com:7687", neo4j.auth.basic("neo4j", "123456"));
  const session = driver.session();

  const personName = 'Alice';
  const resultPromise = session.run(
  
    {name: personName}
  );


  Test.status = function(cb) {
    resultPromise.then(result => {
      session.close();

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      console.log(node.properties.name);

      // on application exit:
      driver.close();
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
