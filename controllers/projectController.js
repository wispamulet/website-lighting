const mongoose = require('mongoose');
const multer = require('multer'); // upload file

const uploadController = require('./uploadController');
const authController = require('./authController');

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
exports.multer = multer(multerOption).array('photos', 5);

exports.save = async (req, res, next) => { // resize and save to /public/uploads/ folder
  // console.log(req.files);
  if (req.files.length === 0) {
    next(); // if req.files === [], skip!
    return;
  } else {
    let i = 0;
    req.body.photos = [];
    req.files.map((file) => {
      const photo = {};
      uploadController.getDimension(file, photo);
      uploadController.rename(file, photo);
      req.body.photos.push(photo);
      uploadController.toUploads(file, req, i, 'projects');
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
  req.body.author = req.user._id; // eslint-disable-line
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
  // res.json(types);
  let all = 0;
  types.forEach((t) => {
    all += t.count;
    return all;
  });
  // types.unshift({ _id: 'Gallery', count: all });
  // console.log(types);

  // res.json(types);
  res.render('projects', { title: `${type || 'Gallery'}`, type, types, all, projects }); // eslint-disable-line
};

exports.editProject = async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });
  authController.confirmOwner(project, req.user);

  res.render('editProject', { title: `Edit ${project.name}`, project });
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();

  req.flash('success', `Successfully updated <strong>${project.name}</strong>`);
  res.redirect(`/projects/${project._id}/edit`); // eslint-disable-line
};
