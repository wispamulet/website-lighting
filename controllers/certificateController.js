const mongoose = require('mongoose');
const multer = require('multer'); // upload file

const uploadController = require('./uploadController');
const authController = require('./authController');

const Certificate = mongoose.model('Certificate');

const multerOption = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: `The filetype isn't allowed!` }, false);
    }
  },
};

// files will be stored in req.files, if no files, req.files = []
exports.multer = multer(multerOption).array('photos', 5);

exports.save = async (req, res, next) => {
  // resize and save to /public/uploads/ folder
  // console.log(req.files);
  if (req.files.length === 0) {
    next(); // if req.files === [], skip!
    return;
  }
  let i = 0;
  req.body.photos = [];
  req.files.map(file => {
    const photo = {};
    uploadController.getDimension(file, photo);
    uploadController.rename(file, photo);
    req.body.photos.push(photo);
    uploadController.toUploads(file, req, i, 'certificates');
    i += 1;
  });

  // res.json(req.body);
  next();
};

exports.addCertificate = (req, res) => {
  res.render('editCertificate', { title: 'Add Certificate' });
};

exports.createCertificate = async (req, res) => {
  req.body.author = req.user._id; // eslint-disable-line
  const certificate = await new Certificate(req.body).save();

  req.flash(
    'success',
    `Successfully create <strong>${certificate.name}</strong>!`
  );
  res.redirect('/support/certificates');
};

exports.editCertificate = async (req, res) => {
  const certificate = await Certificate.findOne({ _id: req.params.id });
  authController.confirmOwner(certificate, req.user);

  res.render('editCertificate', {
    title: `Edit ${certificate.name}`,
    certificate,
  });
};

exports.updateCertificate = async (req, res) => {
  // res.json(req.body);
  const certificate = await Certificate.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      rundValidators: true,
    }
  ).exec();

  req.flash(
    'success',
    `Successfully updated <strong>${certificate.name}</strong>`
  );
  res.redirect(`/certificates/${certificate._id}/edit`); // eslint-disable-line
};

exports.getCertificates = async (req, res) => {
  const certificates = await Certificate.find();
  res.render('certificates', { title: 'Our Certificates', certificates });
};
