const mail = require('../handlers/mail');
const h = require('../helpers');

exports.index = (req, res) => {
  res.render('index', { title: 'LED corn light bulb, LED garden light, LED street light' });
};

exports.home = (req, res) => {
  res.render('home', { title: 'Home' });
};

exports.support = (req, res) => {
  res.render('support', { title: 'Support' });
};

exports.aboutUs = (req, res) => {
  res.render('aboutus', { title: 'About Us' });
};

exports.contact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

exports.query = async (req, res) => {
  // res.json(req.body);
  // return;
  const query = req.body;
  const t = h.moment().format('MMMM Do YYYY, h:mm:ss a');
  query.t = t;
  const subject = `Query from ${req.headers.host}`;

  await mail.query({
    query,
    subject,
    filename: 'query'
  });

  req.flash('success', 'Success!');
  res.redirect('back');
};
