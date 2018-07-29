//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todoApi',{ useNewUrlParser: true }, (err, client)=>{
  if (err){
      return console.log(`Unable to connect to database: ${err} `)
  }
  console.log('Connected to database.')
  var db = client.db('todoApi');
//   db.collection('todo').findOneAndUpdate({
//   _id: new ObjectID('5b5be0a40ca4d798376d3151')
// }, {
//   $set: {
//     completed: true
//   }
// }, {
//     returnOriginal: false
// }).then((result)=>{
//   console.log(result);

db.collection('users').findOneAndUpdate({
  fName: 'John'
},{
  $set: {
    fName: 'Sally',
  },
  $inc: {
    age: 1
  }
},{
  returnOriginal: false
}).then((result) => {
  console.log(result);
});
client.close();
});

//
// Documentation:
// db.collection.findOneAndUpdate(
//    <filter>,
//    <update>,
//    {
//      projection: <document>,
//      sort: <document>,
//      maxTimeMS: <number>,
//      upsert: <boolean>,
//      returnNewDocument: <boolean>,
//      collation: <document>,
//      arrayFilters: [ <filterdocument1>, ... ]
//    }
// )
//https://docs.mongodb.com/manual/reference/operator/update/
// client.close();
// returns lastErrorObject with n: i acted upon; value: {} with document body acted upon and ok: i for status
