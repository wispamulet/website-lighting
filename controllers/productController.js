const mongoose = require('mongoose');
const multer = require('multer'); // handle uploaded files
const jimp = require('jimp'); // resize and save images
const uuid = require('uuid'); // rename images
const sizeOf = require('image-size'); // get dimensions of images
const fs = require('fs'); // handle pdf file

const Product = mongoose.model('Product');

const multerOption = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/pdf');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: `The filetype isn't allowed!` }, false);
    }
  }
};

// files will be stored in req.files, if no files, req.files = {}
exports.upload = multer(multerOption).fields([
  { name: 'photos', maxCount: 10 },
  { name: 'brochure', maxCount: 1 }
]);

exports.resize = async (req, res, next) => { // resize and save to ./public/uploads/ folder
  // console.log(req.files);
  // return;
  const savePdf = (file) => {
    if (!file) return;
    const name = uuid.v4();
    const extension = file.mimetype.split('/')[1];
    req.body.brochure = `${name}.${extension}`;
    const data = file.buffer;
    fs.writeFileSync(`./public/uploads/pdf/${name}.${extension}`, data);
  };

  const getDimension = (file, photo) => {
    const dimension = sizeOf(file.buffer);
    const { height: h, width: w } = dimension;
    photo.dimension = { w, h };
  };

  const rename = (file, photo) => {
    const name = uuid.v4();
    const extension = file.mimetype.split('/')[1];
    photo.original = `${name}.${extension}`;
    photo.thumbnail = `${name}_thumbnail.${extension}`;
  };

  const toUploads = async (file, i) => {
    const photo = await jimp.read(file.buffer);
    await photo.write(`./public/uploads/photos/${req.body.photos[i].original}`);
    const photoThumbnail = await photo.resize(400, jimp.AUTO);
    await photoThumbnail.write(`./public/uploads/photos/${req.body.photos[i].thumbnail}`);
  };

  if (Object.keys(req.files).length === 0) {
    next(); // if there are no files in form, skip!
    return;
  } else {
    savePdf(req.files.brochure[0]);
    if (!req.files.photos) return;
    let i = 0;
    req.body.photos = [];
    req.files.photos.map((file) => {
      const photo = {};
      photo.description = req.body.descriptions[i];
      getDimension(file, photo);
      rename(file, photo);
      req.body.photos.push(photo);
      toUploads(file, i);
      i += 1;
    });
  }
  // res.json(req.body);
  next();
};

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
  const product = await (new Product(req.body)).save();
  req.flash('success', `Successfully create <strong>${product.name}</strong>!`);
  res.redirect(`/product/${product.slug}`);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render('products', { title: 'Products', products });
};

exports.getProductsByType = async (req, res) => {
  function slugToType(slug) { // e.g. 'led-corn-light' => 'LED Corn Light'
    const [led, ...others] = slug.split('-');
    return [led.toUpperCase(), ...others.map(other => other.charAt(0).toUpperCase() + other.slice(1))].join(' ');
  }

  const { slug } = req.params; // 'led-corn-light'
  const type = slugToType(slug); // 'LED Corn Light'
  const typePromise = Product.getTypesList();
  const productPromise = Product.find({ type });
  const [types, products] = await Promise.all([typePromise, productPromise]);
  res.render('products', { title: `${type}`, products });
};

exports.editProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.render('editProduct', { title: `Edit ${product.name}`, product });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${product.name}</strong>. <a href="/product/${product.slug}">View Product -></a>`);
  res.redirect(`/products/${product._id}/edit`); // eslint-disable-line
};
