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
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user);
  });
};

exports.readUser = (req, res) => {
  User.find(req.params, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    }
  );
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
        res.status(200).json({ message: "Authentication successful!"});
      } else {
        res.status(401).json({ message: "Authentication failed!"});
      }
    } else {
      res.status(401).json({ message: "Authentication failed!"});
    }
  });
};
