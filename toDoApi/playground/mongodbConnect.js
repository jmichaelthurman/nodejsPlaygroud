//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApi',{ useNewUrlParser: true }, (err, client)=>{
  if (err){
      return console.log(`Unable to connect to database: ${err} `)
  }
  console.log('Connected to database.')
  var db = client.db('todoApi');
  // db.collection('todo').insertOne({
  //   text: 'Something goes here.',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log(`Unable to insert todo: ${err}`)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('users').insertOne({
    fName: "John",
    lName: "Smith",
    age: 47,
    location: "Norman, OK 73071"
  }, (err, results) => {
    if (err) {
      return console.log(`Unable to insert user. ${err}`);
    }
    console.log(JSON.stringify(results.ops[0]._id.getTimestamp(), undefined, 2));
  });
  client.close();
});
