const jimp = require('jimp'); // resize and save images
const uuid = require('uuid'); // rename images
const sizeOf = require('image-size'); // get dimensions of images
const fs = require('fs'); // handle pdf file

exports.saveBrochure = (file, req) => {
  const name = uuid.v4();
  const extension = file.mimetype.split('/')[1];
  req.body.brochure = `${name}.${extension}`;
  const data = file.buffer;
  fs.writeFileSync(`./public/uploads/pdf/${name}.${extension}`, data);
};

exports.saveIes = (file, req) => {
  const name = uuid.v4();
  const extension = file.mimetype.split('/')[1];
  req.body.ies.push(`${name}.${extension}`);
  // req.body.ies = `${name}.${extension}`;
  const data = file.buffer;
  fs.writeFileSync(`./public/uploads/pdf/${name}.${extension}`, data);
};

exports.saveIst = (file, req) => {
  const name = uuid.v4();
  const extension = file.mimetype.split('/')[1];
  req.body.ist.push(`${name}.${extension}`);
  // req.body.ies = `${name}.${extension}`;
  const data = file.buffer;
  fs.writeFileSync(`./public/uploads/pdf/${name}.${extension}`, data);
};

exports.getDimension = (file, photo) => {
  const dimension = sizeOf(file.buffer);
  const { height: h, width: w } = dimension;
  photo.dimension = { w, h };
};

exports.rename = (file, photo) => {
  const name = uuid.v4();
  const extension = file.mimetype.split('/')[1];
  photo.original = `${name}.${extension}`;
  photo.thumbnail = `${name}_thumbnail.${extension}`;
};

exports.toUploads = async (file, req, i, dest, width = 350) => {
  const photo = await jimp.read(file.buffer);
  await photo.write(`./public/uploads/${dest}/${req.body.photos[i].original}`);
  const photoThumbnail = await photo.resize(width, jimp.AUTO);
  await photoThumbnail.write(
    `./public/uploads/${dest}/${req.body.photos[i].thumbnail}`
  );
};
