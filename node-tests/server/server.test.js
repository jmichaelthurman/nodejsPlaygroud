var request = require('supertest');
var expect = require('expect');
var app = require('./server.js').app;

it('should return Bonjour le Monde',(done)=>{
  request(app)
    .get('/')
    .expect(200)
    .expect('Bonjour, Le Monde!')
    .end(done);
});

it('should return an array of users',(done)=>{
  request(app)
   .get('/users')
   .expect(200)
   .expect({
     users:[
       {
         name:'John',
         age:44
       },
       {name:'Jane',age:'unknown'},
       {name:'Warren',age:'27'}
     ]
   })
   .end(done);
})
