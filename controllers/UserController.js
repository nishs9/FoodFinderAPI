const User = require("../models/User");
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

exports.listAllUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.createNewUser = (req, res) => {
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (existingUser) {
      res.status(403).json({ message: "Username already exists" });
    } else if (err) {
      res.status(500).send(err);
    } else {
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      let newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(201).json(user);
      });
    }
  });
};

exports.getUser = (req, res) => {
  User.find(req.params, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username }, req.body, { new: true }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    }
  );
};

exports.updateUserPassword = (req, res) => {
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  User.findOneAndUpdate(
    { username: req.params.username }, req.body, { new: true }, (err, newPw) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: "Password updated!" });
  });
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "User successfully deleted" });
  });
};

exports.authenticateUser = (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (user) {
      if (bcrypt.compareSync(req.params.password, user.get('password'))) {
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  });
};
