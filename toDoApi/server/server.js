const config = require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require ('./db/mongoose.js');
const validator = require('validator');
let {Todo} = require ('./models/todo.js');
let {User} = require ('./models/user.js');
let {authenticate} = require('./middleware/authenticate.js');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());  // Express calling middleware

// POST TODOS
app.post('/todos', (req, res)=>{
 var todo = new Todo({
   text: req.body.text
 });
 todo.save().then((doc)=>{
   res.status(200).send(doc);
 }, (err)=>{
   res.status(400).send(err);
 });
});

// Route to get all todos
app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
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
   Todo.findById(id).then((todo)=>{
     if(!todo){
       return res.status(404).send({'Error':'ID not found.'})
     }
     return res.status(200).send({todo});
   }, (err)=>{
     res.status(400).send(err);
   });
 });

 app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send({'Error': 'ID not valid.'});
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send({'Error':'ID not found.'})
    }
    return res.status(200).send({todo});
  }, (err)=>{
    res.status(400).send(err);
  });
});


app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed','completedAt']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send({'Error': 'ID not valid.'});
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send({'Error':'ID not found.'})
    }
    return res.status(200).send({todo});
  }, (err)=>{
    res.status(400).send(err);
  });
});

app.post('/users', (req,res) => {
  var body = _.pick(req.body,['email', 'password','fName','lName']);
  var user = new User(body);
  
  user.save().then(() =>{
    return user.generateAuthToken(); //custom instance method
    }).then((token) =>{
      res.header('x-auth',token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/users/me',authenticate,(req,res) =>{
  
  res.send(req.user);
});

app.listen(port,()=> {
  console.log(`Server started. Listening on port ${port}.`);
});
module.exports = {app};
