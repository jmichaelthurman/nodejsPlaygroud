const _ = require('lodash');
const expect = require('expect');
const request  = require('supertest');
const {MongoClient, ObjectID} = require('mongodb');
var {app} = require('./../server.js');
var {Todo} = require('./../models/todo.js');
var {User} = require('./../models/user.js');

const todos = [{
  _id: new ObjectID(),
  text: 'hakuna matata',
  completed: false
},
{
  _id: new ObjectID(),
  text: 'hakuna matatas',
  completed: true,
  completedAt: 1533529211503
},
{
  _id: new ObjectID(),
  text: 'hakuna, ma tatas',
  completed: false
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=> {
    return Todo.insertMany(todos);
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
        Todo.find({text}).then((todos)=>{
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
        Todo.find().then((todos)=>{
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


  describe('GET, /todos/:id',()=>{
    it('should return a single todo doc by _id',(done)=>{
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todo.text).toBe(todos[0].text);
         //console.log(res.body.todo.length);
        //
      })
      .end(done);
    });
    it('should return a 404 if todo not found',(done)=>{
     var id = new ObjectID().toHexString();

      request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    })

  it('should return 404 for invalid object ids', (done)=>{
    var id = '12345a';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE, /todos/:id',()=>{
  it('should remove a single todo doc by _id',(done)=>{
    let hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
       //console.log(res.body.todo.length);
      //
    })
    .end(done);
  });
  it('should return a 404 if todo not found',(done)=>{
   var id = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  })

it('should return 404 for invalid object ids', (done)=>{
  var id = '12345a';
  request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
});
});

describe('PATCH, /todos:id', ()=>{
  it ('should update a todo', (done)=>{
    let text = "_.pick(body,['text','completed'])";
    let hexId = todos[0]._id.toHexString()

    request(app)
      .patch(`/todos/${hexId}`)
      .send({completed: true,text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
    });

  it('should clear completedAt when a todo is marked a not completed', (done)=>{
    let text = "resetting complete to false";
    let hexId = todos[0]._id.toHexString()

    request(app)
      .patch(`/todos/${hexId}`)
      .send({completed: false,text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeNull;
      })
      .end(done);
  })

  it('should not update todo when passed bad data',(done)=>{
    let text = {};
    let hexId = todos[1]._id.toHexString()
    request(app)
      .patch(`/todos/${hexId}`)
      .send({text})
      .expect(400)
      .end(done);
        
      })
      // done();
    });
  // });