const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const user1ID = new ObjectID();
const user2ID = new ObjectID();

const users =[{
    _id: user1ID,
    email: 'me@me.com',
    password: 'thatOnePassword',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: user1ID, access:'auth'}, 'somesecret').toString()
    }]
},{
    _id: user2ID,
    email: 'her@here.com',
    password: 'pa$$word'

}]


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

// const populateUsers = (done) => {
//     User.remove({}).then(() => {
//         var userOne = new User(users[0]).save();
//         var userTwo = new User(users[1]).save();
//        return Promise.all([userOne, userTwo]).then(()=>done());
//     });
// };
const populateUsers = (done) => {
    User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
  
      return Promise.all([userOne, userTwo])
    }).then(() => done());
  };

  module.exports = { todos, populateTodos, users, populateUsers};