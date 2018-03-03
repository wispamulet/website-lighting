const mongoose = require('mongoose');

const Project = mongoose.model('Project');

exports.addProject = (req, res) => {
  res.render('editProject', { title: 'Add Project' });
};

exports.createProject = async (req, res) => {
  // res.json(req.body);
  const project = await (new Project(req.body)).save();
  req.flash('success', `Successfully create <strong>${project.name}</strong>!`);
  res.redirect(`/project/${project.slug}`);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  // res.json(projects);
  res.render('projects', { title: 'Projects', projects });
};
