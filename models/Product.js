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
  type: {
    type: String,
    required: 'Please choose a type!'
  },
  bullet_points: {
    type: [String],
    trim: true,
  },
  voltage: {
    type: String,
    trim: true
  },
  ip_rate: {
    type: String,
    trim: true
  },
  cri: {
    type: String,
    trim: true
  },
  lifespan: {
    type: String,
    trim: true
  },
  application: {
    type: String,
    trim: true
  },
  color_temperatures: {
    type: [String],
    trim: true
  },
  certificates: {
    type: [String],
    trim: true
  },
  model_no: {
    type: [String],
    trim: true
  },
  power: {
    type: [String],
    trim: true
  },
  base_type: {
    type: [String],
    trim: true
  },
  lumen: {
    type: [String],
    trim: true
  },
  dim: {
    type: [String],
    trim: true
  },
  ctn_size: {
    type: [String],
    trim: true
  },
  ctn_quantity: {
    type: [String],
    trim: true
  },
  ctn_weight: {
    type: [String],
    trim: true
  },
  brochure: {
    type: String,
    trim: true
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
    trim: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  }
});

productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip it!
    return;
  }
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const productsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (productsWithSlug.length) {
    this.slug = `${this.slug}-${productsWithSlug.length + 1}`;
  }
  next();
});

productSchema.statics.getTypesList = function () {
  return this.aggregate([
    { $unwind: '$type' },
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

module.exports = mongoose.model('Product', productSchema);
