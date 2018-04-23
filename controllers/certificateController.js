const mongoose = require('mongoose');
const multer = require('multer'); // upload file
const jimp = require('jimp'); // resize images
const uuid = require('uuid'); // rename images
const sizeOf = require('image-size'); // get dimensions of images

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
  }
};

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
    await photo.write(`./public/uploads/certificates/${req.body.photos[i].original}`);
    const photoThumbnail = await photo.resize(200, jimp.AUTO);
    await photoThumbnail.write(`./public/uploads/certificates/${req.body.photos[i].thumbnail}`);
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

exports.support = async (req, res) => {
  const certificates = await Certificate.find();
  res.render('support', { title: 'Support', certificates });
};

exports.addCertificate = (req, res) => {
  res.render('editCertificate', { title: 'Add Certificate' });
};

exports.createCertificate = async (req, res) => {
  const certificate = await (new Certificate(req.body)).save();
  req.flash('success', `Successfully create <strong>${certificate.name}</strong>!`);
  res.redirect('/support');
};
