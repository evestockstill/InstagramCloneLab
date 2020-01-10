const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: Date.now()
  }
});
schema.pre('save', function(next) {
  let user = this;
  if(!user.isModified('password')) return next();
})
module.exports = mongoose.model('User', schema);
