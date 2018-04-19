const axios = require('axios');
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

exports.queryValidate = (req, res, next) => {
  // res.json(req.body);
  // return;
  const url = 'https://www.google.com/recaptcha/api/siteverify';

  axios
    .post(url, {
      secret: process.env.SECRET_KEY,
      responsive: req.body['g-recaptcha-response']
    })
    .then((data) => {
      console.log('yes');
      res.json(data);
    })
    .catch((err) => {
      console.log('no');
      res.json(err);
    });

  // if (!req.body['g-recaptcha-response']) {
  //   req.flash('error', 'You must pass reCAPTCHA!');
  //   res.redirect('back');
  // } else {
  //   next();
  // }
};

exports.query = async (req, res) => {
  const query = req.body;
  const t = h.moment().format('MMMM Do YYYY, h:mm:ss a');
  query.t = t;
  const subject = `Query from ${req.headers.host}`;

  await mail.query({
    query,
    subject,
    filename: 'query'
  });

  req.flash('success', 'Successfully send the query! We will send you a feedback as soon as possible.');
  res.redirect('back');
};
