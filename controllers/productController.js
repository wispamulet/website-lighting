const mongoose = require('mongoose');
const multer = require('multer'); // handle uploaded files

const uploadController = require('./uploadController');
const authController = require('./authController');

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
exports.multer = multer(multerOption).fields([
  { name: 'photos', maxCount: 7 },
  { name: 'brochure', maxCount: 1 }
]);

exports.save = async (req, res, next) => { // resize and save to ./public/uploads/ folder
  // console.log(req.files);
  // return;
  if (Object.keys(req.files).length === 0) {
    next(); // if req.files === {}, skip!
    return;
  } else {
    if (req.files.brochure) {
      uploadController.savePdf(req.files.brochure[0], req);
    }
    if (req.files.photos) {
      let i = 0;
      req.body.photos = [];
      req.files.photos.map((file) => {
        const photo = {};
        uploadController.getDimension(file, photo);
        uploadController.rename(file, photo);
        req.body.photos.push(photo);
        uploadController.toUploads(file, req, i, 'products', 400);
        i += 1;
      });
    }
  }
  // res.json(req.body);
  next();
};

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line
  const product = await (new Product(req.body)).save();

  req.flash('success', `Successfully create <strong>${product.name}</strong>!`);
  // res.redirect(`/product/${product.slug}`);
  res.redirect('/products');
};

// exports.getProducts = async (req, res) => {
//   const products = await Product.find();
//   const garden = await Product.find({ type: 'LED Garden Light' });
//   res.json(garden);
//   // res.render('products', { title: 'Products', products });
// };

exports.getProductsByType = async (req, res) => {
  // function toType(type = '') { // e.g. 'led-corn-light' => 'LED Corn Light'
  //   const [led, ...others] = type.split('-');
  //   return [led.toUpperCase(), ...others.map(other => other.charAt(0).toUpperCase() + other.slice(1))].join(' ');
  // }
  const { type } = req.params;
  const typeQuery = type || { $exists: true };
  const typePromise = Product.getTypesList();
  const productPromise = Product.find({ type: typeQuery });
  const [types, products] = await Promise.all([typePromise, productPromise]);
  res.render('products', { title: `${type || 'Products'}`, types, products });
};

exports.downloadBrochure = (req, res) => {
  const brochure = `./public/uploads/pdf/${req.params.brochure}`;

  res.download(brochure, (err) => {
    if (err) {
      req.flash('error', 'Oops! The brochure of this product might be missing!');
      res.redirect('back');
    }
  });
};

exports.getProductBySlug = async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return next();
  res.render('product', { product, title: product.name });
};

exports.editProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  // confirm the user is the owner of the product
  authController.confirmOwner(product, req.user);

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
