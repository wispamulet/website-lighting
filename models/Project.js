const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a project name!'
  },
  slug: String,
  type: String,
  description: {
    type: [String],
    trim: true,
  },
  photos: [String],
  dimensions: [
    {
      w: String,
      h: String
    }
  ],
  photoThumbnails: [String]
});

projectSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Project', projectSchema);
