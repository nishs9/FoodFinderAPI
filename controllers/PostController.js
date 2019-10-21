const Post = require("../models/Post");
var fs = require('fs');
var Grid = require('gridfs-stream');

//createPost body:
// { username, imgPath, postTitle, description}

exports.createPost = (req, res) => {
    var newPost = new Post;
    newPost.username = req.body.username;
    newPost.img.data = fs.readFileSync(req.body.img);
    newPost.postTitle = req.body.postTitle;
    newPost.description = req.body.description;
    newPost.save((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json({ message: "Post created successfully" });
    });
};

exports.getPost = (req, res) => {
    Post.findOne( { username: req.params.username }, (err, post) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.set("Content-Type","img/png");
          res.send(post.img);
        }
    });
};
