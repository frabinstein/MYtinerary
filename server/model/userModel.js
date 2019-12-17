const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true
  },
  userPic: {
    type: String,
  }
})

//name of module is the singular version (user) of the database name (users)
module.exports = mongoose.model('user', userSchema)
