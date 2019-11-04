const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/UserController");
const postController = require("./controllers/PostController");
const imageController = require("./controllers/ImageController");

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
  .route("/UserData/:username/:isPasswordChange")
  .put(userController.updateUserPassword);

app
  .route("/Posts")
  .post(postController.createPost)
  .get(postController.getPost);

app
  .route("/Images")
  .post(imageController.postImage)
  .get(imageController.getImage);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
