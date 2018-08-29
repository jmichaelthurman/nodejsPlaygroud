const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');

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

  const  populateTodos = (done) => {
      Todo.remove({}).then(()=> {
          return Todo.insertMany(todos);
      }).then(() => done());
  };

  module.exports = { todos, populateTodos};