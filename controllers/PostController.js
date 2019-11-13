const Post = require("../models/Post");
const mongoose = require("mongoose");
var fs = require('fs');
var Grid = require('gridfs-stream');
var ObjectId = mongoose.Schema.Types.ObjectId;

//createPost body:
// { username, postTitle, description, imgPointer }

exports.createPost = (req, res) => {
    var newPost = new Post();
    newPost.username = req.body.username;
    newPost.postTitle = req.body.postTitle;
    newPost.description = req.body.description;
    newPost.likes = 0;
    newPost.imgPointer = req.body.imgPointer;
    newPost.save((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(201).json({ message: "Post created successfully", postId: post._id });
    });
};

exports.getPost = (req, res) => {
    Post.findById(req.body.postId, (err, post) => {
        if (err) {
          res.status(500).json({ message: "Post does not exist" });
        } else {
          res.status(200).json(
            { username: post.username,
              postTitle: post.postTitle,
              description: post.description,
              likes: post.likes,
              imgPointer: post.imgPointer
            });
        }
    });
};

exports.getAllPosts = (req, res) => {
    Post.find({}, (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    });
};

exports.likePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
      $inc: { likes: 1 } }, { new: true }, (err, post) => {
          if (err) {
            res.status(500).json({ message: "Post does not exist" });
          } else {
            res.status(200).json({ likes: post.likes })
          }
      });
};
