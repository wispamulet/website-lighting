const mongoose = require('mongoose');

const Product = mongoose.model('Product');

exports.index = (req, res) => {
  res.render('index', { title: 'LED corn light bulb, LED garden light, LED street light' });
};

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
  // res.json(req.body);
  const product = await (new Product(req.body)).save();
  req.flash('success', `Successfully create ${product.name}`);
  res.redirect(`/product/${product.slug}`);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render('products', { title: 'Products', products });
};
