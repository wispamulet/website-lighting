const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const SlideshowSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name!'
  },
  photo: {
    type: String,
    trim: true,
  },
  caption: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  }
});

module.exports = mongoose.model('Slideshow', SlideshowSchema);
