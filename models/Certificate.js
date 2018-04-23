const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a certificate name!'
  },
  photos: [
    {
      original: {
        type: String,
        trim: true
      },
      dimension: {
        w: String,
        h: String
      },
      thumbnail: String
    }
  ]
});

module.exports = mongoose.model('Certificate', certificateSchema);
