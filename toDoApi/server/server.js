var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require ('./db/mongoose.js');
var {todo} = require ('./models/todo.js');
var {user} = require ('./models/user.js');

var app = express();

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
    res.stats(400).send(err);
  });
 });

app.listen(3000,()=> {
  console.log('Server started. Listening on port 3000.');
});

module.exports = {app};
