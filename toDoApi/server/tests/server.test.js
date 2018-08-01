const expect = require('expect');
const request  = require('supertest');

var {app} = require('./../server.js');
var {todo} = require('./../models/todo.js');
var {user} = require('./../models/user.js');

const todos = [{
  text: 'hakuna matata'
},
{
  text: 'hakuna matatas'
},
{
  text: 'hakuna, ma tatas'
}];

beforeEach((done)=>{
  todo.remove({}).then(()=> {
    return todo.insertMany(todos);
  }).then(()=>done());
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
        todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
      //    expect(todos[(todos.length -1)].text).toBe('Created a new todo');
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
          expect(todos.length).toBe(3);
        // Use Chai ==>  expect(todos[0]).text.to.not.exist;
          done();
        })
        .catch((err)=> done(err));
      })
    });
  });

describe('GET, /todos',()=>{
  it('should return a list of todos',(done)=>{
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    });
  });
