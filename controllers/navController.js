// const axios = require('axios');
const reCAPTCHA = require('recaptcha2');
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

exports.queryValidate = async (req, res, next) => {
  // res.json(req.body);
  // return;

  const recaptcha = new reCAPTCHA({
    siteKey: process.env.SITE_KEY,
    secretKey: process.env.SECRET_KEY
  });

  await recaptcha.validateRequest(req)
    .then(() => {
      res.json({ formSubmit: true });
    })
    .catch((errorCodes) => {
      res.json({
        formSubmit: false,
        errors: recaptcha.translateErrors(errorCodes)
      });
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
