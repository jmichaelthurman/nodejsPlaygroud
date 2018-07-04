const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
       return console.log("Unable to connect to the mongoDB server.")
    }
    console.log("Successfully connected to the mongoDB server.");

   /*  db.collection('Todos').find({_id: new ObjectID('5a9f671fbae9b41f7ceaf7af')}).toArray().then((docs)=> {
        console.log('Todos:')
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err)=> {
       console.log('Unable to fetch todos.');
    }); */
    
    db.collection('Todos').find().count().then((count)=> {
        console.log('Todos:')
        //console.log(JSON.stringify(docs, undefined, 2));
        console.log(`Todos count: ${count}`);
    }, (err)=> {
       console.log('Unable to fetch todos.');
    });
    //db.close();
});
