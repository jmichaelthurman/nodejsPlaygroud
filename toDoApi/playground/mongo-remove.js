const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

todo.remove({}).then((result) => {
    console.log(result);
  });