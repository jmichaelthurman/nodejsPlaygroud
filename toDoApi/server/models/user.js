let mongoose = require('mongoose');

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

module.exports = {user};
