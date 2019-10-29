const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/UserController");
const postController = require("./controllers/PostController");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

// API ENDPOINTS FOR USER ACTIONS

app
  .route("/UserData")
  .get(userController.listAllUsers)
  .post(userController.createNewUser);

app
  .route("/UserData/:username")
  .get(userController.readUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

app
  .route("/UserData/:username/:password")
  .get(userController.authenticateUser);

app
  .route("/Posts")
  .post(postController.createPost);

//API LOGIC FOR IMAGE POSTING

var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema(
  { img:
    { data: Buffer, contentType: String}
  }
);

var Image = mongoose.model('Images',ImageSchema);

app.post('/Images', function(req, res) {
  var newImage = new Image();
  newImage.img.data = fs.readFileSync(req.body.filepath);
  newImage.img.contentType = 'image/png';
  newImage.save((err, img) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json({ message: "Image posted!" });
  });
});

app.get('/Images', function(req, res) {
  Image.findOne({}, (err, img) => {
    if (err) {
      img.status(500).send(err)
    }
    res.contentType(img.img.contentType);
    res.send(img.img.data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
