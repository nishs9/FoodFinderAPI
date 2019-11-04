const Image = require("../models/Image");
var fs = require('fs');

exports.postImage = (req, res) => {
  var newImage = new Image();
  newImage.data = fs.readFileSync(req.body.filepath);
  newImage.contentType = 'image/png';
  newImage.save((err, img) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json({ message: "Image posted!", imgId: img._id });
  });
};

exports.getImage = (req, res) => {
  Image.findOne({}, (err, img) => {
    if (err) {
      img.status(500).send(err)
    }
    res.contentType(img.contentType);
    res.send(img.data);
  });
};
