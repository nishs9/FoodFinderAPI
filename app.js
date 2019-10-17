const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/UserController");

// db instance connection
require("./config/db");

const app = express();

const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API ENDPOINTS

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
