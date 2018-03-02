const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a product name!'
  },
  slug: String,
  type: String,
  model: {
    type: String,
    trim: true
  },
  power: {
    type: String,
    trim: true
  },
  base: {
    type: String,
    trim: true
  }
});

productSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next(); // skip it!
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Product', productSchema);
