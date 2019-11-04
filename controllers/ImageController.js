const Image = require("../models/Image");
var fs = require('fs');

exports.postImage = (req, res) => {
  var newImage = new Image();
  newImage.data = fs.readFileSync(req.body.filepath);
  var imgType = req.body.filepath.substring(req.body.filepath.length - 3, req.body.filepath.length);
  newImage.contentType = 'image/'.concat(imgType);
  newImage.save((err, img) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json({ message: "Image posted!", imgId: img._id });
  });
};

exports.getImage = (req, res) => {
  Image.findById(req.body.imgId, (err, img) => {
    if (err) {
      img.status(500).send(err)
    }
    res.contentType(img.contentType);
    res.send(img.data);
  });
};
