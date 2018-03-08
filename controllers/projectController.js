const mongoose = require('mongoose');
const multer = require('multer'); // upload file
const jimp = require('jimp'); // resize images
const uuid = require('uuid'); // rename images

const Project = mongoose.model('Project');

const multerOption = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: `The filetype isn't allowed!` }, false);
    }
  }
};

// The array of files will be stored in req.files, if no files, req.files = []
exports.upload = multer(multerOption).array('photo', 3);

exports.resize = async (req, res, next) => { // resize and save to /public/uploads folder
  // console.log(req.files);

  const rename = (file) => {
    const extension = file.mimetype.split('/')[1];
    req.body.photo.push(`${uuid.v4()}.${extension}`);
  };

  const uploads = async (file) => {
    const photo = await jimp.read(file.buffer);
    await photo.resize(800, jimp.AUTO);
    await req.body.photo.map((item) => {
      photo.write(`./public/uploads/${item}`);
    });
  };

  if (req.files.length === 0) {
    next(); // skip!
    return;
  } else if (req.files.length === 1) {
    req.body.photo = [];
    rename(req.files[0]);
    uploads(req.files[0]);
  } else {
    req.body.photo = [];
    req.files.map((file) => {
      rename(file);
      uploads(file);
    });
  }

  next();
};

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
