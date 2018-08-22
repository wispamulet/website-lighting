const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const newSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Don't forget to add a title!",
  },
  slug: {
    type: String,
  },
  type: {
    type: String,
    required: 'Please choose a type!',
  },
  html: {
    type: String,
    trim: true,
  },
  txt: {
    type: String,
    trim: true,
  },
  keywords: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!',
  },
});

newSchema.pre('save', async function(next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  this.slug = slug(this.title);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const projectsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (projectsWithSlug.length) {
    this.slug = `${this.slug}-${projectsWithSlug.length + 1}`;
  }
  next();
});

newSchema.statics.getTypesList = function() {
  return this.aggregate([
    { $unwind: '$type' },
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
};

module.exports = mongoose.model('News', newSchema);
