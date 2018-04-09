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

// files will be stored in req.files, if no files, req.files = []
exports.upload = multer(multerOption).array('photos', 5);

exports.resize = async (req, res, next) => { // resize and save to /public/uploads/ folder
  // console.log(req.files);
  const getDimensions = (file, photo) => {
    const dimensions = sizeOf(file.buffer);
    const { height: h, width: w } = dimensions;
    photo.dimension = { w, h };
  };

  const rename = (file, photo) => {
    const name = uuid.v4();
    const extension = file.mimetype.split('/')[1];
    photo.original = `${name}.${extension}`;
    photo.thumbnail = `${name}_thumbnail.${extension}`;
  };

  const toUploads = async (file, i) => {
    const photo = await jimp.read(file.buffer);
    await photo.write(`./public/uploads/photos/${req.body.photos[i].original}`);
    const photoThumbnail = await photo.resize(350, jimp.AUTO);
    await photoThumbnail.write(`./public/uploads/photos/${req.body.photos[i].thumbnail}`);
  };

  if (req.files.length === 0) {
    next(); // if req.files === [], skip!
    return;
  } else {
    let i = 0;
    req.body.photos = [];
    req.files.map((file) => {
      const photo = {};
      getDimensions(file, photo);
      rename(file, photo);
      req.body.photos.push(photo);
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
  // res.redirect(`/project/${project.slug}`);
  res.redirect('/gallery');
};

// exports.getProjects = async (req, res) => {
//   const projects = await Project.find();
//   res.render('projects', { title: 'Gallery', projects });
// };

exports.getProjectsByType = async (req, res) => {
  const { type } = req.params;
  const typeQuery = type || { $exists: true };
  // console.log(typeQuery);
  const typePromise = Project.getTypesList();
  const projectPromise = Project.find({ type: typeQuery });
  const [types, projects] = await Promise.all([typePromise, projectPromise]);
  // console.log(projects);
  res.render('projects', { title: `${type || 'Gallery'}`, type, types, projects });
};
