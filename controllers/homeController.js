// const mongoose = require('mongoose');

// const Project = mongoose.model('Project');

exports.home = async (req, res) => {
  // TODO
  // const projects = await Project.getIntroList();
  // res.json(projects);
  res.render('home', { title: 'Home' });
};

exports.addSlideshow = (req, res) => {
  res.render('editSlideshow', { title: 'Add Slideshow' });
};
