const mongoose = require('mongoose');
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address!'],
    required: 'Please supply an email address!'
  },
  name: {
    type: String,
    required: 'Please supply a name!',
    trim: true
  },
  level: Number,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.pre('save', async function (next) {
  // 1 for admin
  // 10 for staff
  // 20 for the others
  this.level = 20;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
