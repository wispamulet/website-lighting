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
  ],
  descriptions: {
    type: [String],
    trim: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  }
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

projectSchema.statics.getTypesList = function () {
  return this.aggregate([
    { $unwind: '$type' },
    { $group: { _id: '$type', count: { $sum: 1 } }},
    { $sort: { count: -1 } }
  ]);
};

projectSchema.statics.getIntroList = function () {
  return this.aggregate([
    { $unwind: '$type' },
    { $sample: { size: 3 } }
  ]);
};

module.exports = mongoose.model('Project', projectSchema);
