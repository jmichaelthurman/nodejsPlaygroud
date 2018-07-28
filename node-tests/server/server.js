var express = require('express');

var app = express();

app.get('/',(req,res)=>{
  res.send('Bonjour, Le Monde!')
});

app.get('/users',(req,res)=>{
  res.send({
    users:[{
      name:'John',
      age: 44
  },
  {
    name:'Jane',
    age:'unknown'
  },
  {
    name:'Warren',
    age:'27'
  }]
});
});

app.listen(3000);

module.exports.app = app;
