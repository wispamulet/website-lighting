const mongoose = require('mongoose');
const multer = require('multer'); // upload file
const jimp = require('jimp'); // resize images
const uuid = require('uuid'); // rename images
const sizeOf = require('image-size'); // get dimensions of images

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
  const getDimensions = (file) => {
    const dimensions = sizeOf(file.buffer);
    // console.log(dimensions);
    const { height: h, width: w } = dimensions;
    req.body.dimensions.push({ w, h });
  };

  const rename = (file) => {
    const name = uuid.v4();
    const extension = file.mimetype.split('/')[1];
    req.body.photos.push(`${name}.${extension}`);
    req.body.photoThumbnails.push(`${name}_thumbnail.${extension}`);
  };

  const toUploads = async (file, i = 0) => {
    const photo = await jimp.read(file.buffer);
    await photo.write(`./public/uploads/${req.body.photos[i]}`);
    const photoThumbnail = await photo.resize(250, jimp.AUTO);
    await photoThumbnail.write(`./public/uploads/${req.body.photoThumbnails[i]}`);
  };

  if (req.files.length === 0) {
    next(); // skip!
    return;
  } else if (req.files.length === 1) {
    req.body.photos = [];
    req.body.photoThumbnails = [];
    req.body.dimensions = [];
    // console.log(req.files[0]);
    getDimensions(req.files[0]);
    rename(req.files[0]);
    toUploads(req.files[0]);
  } else {
    let i = 0;
    req.body.photos = [];
    req.body.photoThumbnails = [];
    req.body.dimensions = [];
    req.files.map((file) => { // eslint-disable-line
      // console.log(file);
      getDimensions(file);
      rename(file);
      toUploads(file, i);
      i += 1;
    });
  }

  // res.json(req.body);
  next();
};

exports.addProject = (req, res) => {
  res.render('editProject', { title: 'Add Project' });
};

exports.createProject = async (req, res) => {
  const project = await (new Project(req.body)).save();
  req.flash('success', `Successfully create <strong>${project.name}</strong>!`);
  res.redirect(`/project/${project.slug}`);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  // res.json(projects);
  res.render('projects', { title: 'Projects', projects });
};
