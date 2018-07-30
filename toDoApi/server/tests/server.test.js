const expect = require('expect');
const request  = require('supertest');

var {app} = require('./../server.js');
var {todo} = require('./../models/todo.js');
var {user} = require('./../models/user.js');

beforeEach((done)=>{
  todo.remove({}).then(()=> done());
});

describe('POST, /todos', ()=>{
  it ('should create a new todo', (done)=>{
    var text = 'Created a new todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        todo.find().then((todos)=>{
          expect(todos.length).toBe(1);
      //    expect(todos.length > 0).toBeTruthy();
          expect(todos[(todos.length -1)].text).toBe('Created a new todo');
          done();
        })
        .catch((err)=> done(err));
      })
    });
  


  it('should not create a new todo when passed bad data',(done)=>{
    var text = {};
    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        todo.find().then((todos)=>{
          expect(todos.length).toBe(0);
        // Use Chai ==>  expect(todos[0]).text.to.not.exist;
          done();
        })
        .catch((err)=> done(err));
      })
    });
  });
