const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
       return console.log("Unable to connect to the mongoDB server.")
    }
    console.log("Successfully connected to the mongoDB server.")

    /* db.collection('Todos').insertOne({
        test: 'More to do',
        completed: false
    }, (err, result)=>{
        if(err){
            return console.log('Unable to insert todo document ', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */

    db.collection('Users').insertOne({
        name: 'John Doe',
        age: 27,
        location: 'New Orleans'
          }, (err, result)=>{
        if(err){
            return console.log('Unable to insert user into collection: Users.');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.close();
});

