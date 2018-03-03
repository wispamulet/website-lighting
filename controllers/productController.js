const mongoose = require('mongoose');

const Product = mongoose.model('Product');

exports.addProduct = (req, res) => {
  res.render('editProduct', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
  // res.json(req.body);
  const product = await (new Product(req.body)).save();
  req.flash('success', `Successfully create <strong>${product.name}</strong>!`);
  res.redirect(`/product/${product.slug}`);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.render('products', { title: 'Products', products });
};

exports.editProduct = async (req, res) => {
  // res.json(req.params);
  const product = await Product.findOne({ _id: req.params.id });
  // res.json(product);
  res.render('editProduct', { title: `Edit ${product.name}`, product });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${product.name}</strong>. <a href="/product/${product.slug}">View Product -></a>`);
  res.redirect(`/products/${product._id}/edit}`); // eslint-disable-line
};
