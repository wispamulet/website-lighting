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
