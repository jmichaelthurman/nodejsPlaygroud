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

//   db.collection('users').insertOne({
//     fName: "John",
//     lName: "Smith",
//     age: 47,
//     location: "Norman, OK 73071"
//   }, (err, results) => {
//     if (err) {
//       return console.log(`Unable to insert user. ${err}`);
//     }
//     console.log(JSON.stringify(results.ops[0]._id.getTimestamp(), undefined, 2));
//   });
//   client.close();
// });

//Deleting objects
// deleteMany
//  db.collection('todoApi').deleteMany({text:'Eat lunch'}).then((result)=>{ console.log(result)});
// the result object will be {ok: 1, n: 3} to indicate success on 3 objects
// deleteOne
// db.collection('todoApi').deleteOne({text: 'Eat lunch'}).then((result)=>{console.log(result)});
// findOneAndDelete
 db.collection('users').findOneAndDelete({
   age: 47
 }).then((result)=>{
   console.log(result);
 });
});
// client.close();
// returns lastErrorObject with n: i acted upon; value: {} with document body acted upon and ok: i for status
