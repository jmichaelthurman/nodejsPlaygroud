const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require ('./db/mongoose.js');
var {todo} = require ('./models/todo.js');
var {user} = require ('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());  // Express calling middleware

// POST TODOS
app.post('/todos', (req, res)=>{
 var toDo = new todo({
   text: req.body.text
 });
 toDo.save().then((doc)=>{
   res.status(200).send(doc);
 }, (err)=>{
   res.status(400).send(err);
 });
});

// Route to get all todos
app.get('/todos',(req,res)=>{
  todo.find().then((todos)=>{
      res.send({todos});
  }, (err)=> {
    res.status(400).send(err);
  });
 });

 // GET todos byId

 app.get('/todos/:id',(req,res)=>{
   var id = req.params.id;

   if (!ObjectID.isValid(id)){
     return res.status(404).send({'Error': 'ID not valid.'});
   }
   todo.findById(id).then((todo)=>{
     if(!todo){
       return res.status(404).send({'Error':'ID not found.'})
     }
     return res.status(200).send({todo});
   }, (err)=>{
     res.status(400).send(err);
   });
 });

app.listen(port,()=> {
  console.log(`Server started. Listening on port ${port}.`);
});


module.exports = {app};
