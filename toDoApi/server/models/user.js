const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid e-mail.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
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

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'somesecret').toString();

  user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then( () => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try{
    decoded=jwt.verify(token, 'somesecret');
  } catch(e){
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });

};

let User = mongoose.model('User', UserSchema);

module.exports = {User};
