const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const strConnection = 'mongodb+srv://admin:admin@cluster0.ixqop.mongodb.net';

MongoClient.connect(strConnection, function (err, client) {
  if (err) throw err;

  var db = client.db('Geography');

  db.collection('headOfState').find({}).toArray( function(err, docs) {
    if (err) throw err;
    console.log("Found the following records");
    console.log(docs)
    
  });
});

const findHeadOfStates = function() {
    MongoClient.connect(strConnection, function (err, client) {
        if (err) throw err;
      
        var db = client.db('Geography');
      
        db.collection('headOfState').find({}).toArray(function(err, docs) {
          if (err) throw err;
          console.log("Found the following records");
          console.log(docs)
          client.close();
        });
      });
      
  }
 

 module.exports = { findHeadOfStates,}
