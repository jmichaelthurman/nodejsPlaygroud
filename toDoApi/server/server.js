let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoApp',{useNewUrlParser: true});

let toDo = mongoose.model('toDo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

let user = mongoose.model('user', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  fName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  lName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// let newToDo = new toDo({
//   text: ' 1',
//   completed: false,
//   // completedAt: 0
// });
//
// newToDo.save().then((doc)=>{
//   console.log(`Save.toDo ${JSON.stringify(doc, undefined, 2)}`);
// }, (e) => {
//   console.log('Unable to save todo', e);
// });

let user = new user({
  email: 'me@myname.com',
  fName: 'Me',
  lName: 'Us'
});

user.save().then((doc)=> {
  console.log(`Saved user ${JSON.stringify(doc, undefined, 2)}`);
}, (err) => {
  console.log(`Unable to save user`, err);
});
