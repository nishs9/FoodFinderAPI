const Image = require("../models/Image");
var fs = require('fs');
var Grid = require('gridfs-stream');

exports.addImage = (req, res) => {
    var newImage = new Image;
    newImage.img.data = fs.readFileSync(req.body.filepath)
    newImage.save(function (err, img) {
        if (err) throw err;

        console.error('saved img to db');
    });
};
