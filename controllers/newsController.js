const mongoose = require('mongoose');

const News = mongoose.model('News');

exports.getNews = async (req, res) => {
  res.render('news', { title: 'news' });
};

exports.addNews = async (req, res) => {
  res.render('editNews', { title: 'Add News' });
};

exports.createNews = async (req, res) => {
  req.body.author = req.user._id;
  const news = await new News(req.body).save();
  req.flash('success', 'Good to go~');
  res.redirect('back');
};

exports.getNewsByType = async (req, res) => {
  const { type } = req.params;
  const typeQuery = type || { $exists: true };
  const typePromise = News.getTypesList();
  const NewsPromise = News.find({ type: typeQuery });
  const [types, news] = await Promise.all([typePromise, NewsPromise]);
  res.render('news', { title: 'News', type, types, news });
};

exports.getNewsBySlug = async (req, res) => {
  // res.json(req.params);
  const { type, slug } = req.params;
  const typePromise = News.getTypesList();
  let types = typePromise.then(data => {
    types = data;
  });
  const n = await News.findOne({
    slug,
  });
  res.render('new', { title: `${n.title}`, n, type, types });
};

exports.renderNews = async (req, res) => {
  const { q } = req.query;
  const news = await News.findOne({
    slug: q,
  });
  res.json(news);
};
