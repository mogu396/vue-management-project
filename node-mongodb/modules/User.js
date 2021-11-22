const mongoose = require('mongoose')
const dayjs =require('dayjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userPasswordConfirm: {
    type: String
  },
  identity: {
    type: String,
    required:true
    
  },
  date: {
    type: Date,
    default: dayjs().add(8,'hour')
  }
})

module.exports = mongoose.model('users', userSchema)