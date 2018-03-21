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
  type: {
    type: String,
    required: 'Please choose a type!'
  },
  descriptions: {
    type: [String],
    trim: true,
  },
  photos: {
    type: [String],
    trim: true,
  },
  dimensions: [
    {
      w: String,
      h: String
    }
  ],
  photoThumbnails: [String]
});

projectSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const projectsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (projectsWithSlug.length) {
    this.slug = `${this.slug}-${projectsWithSlug.length + 1}`;
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
