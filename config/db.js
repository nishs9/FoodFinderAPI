const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const dbURI =
  "mongodb://nishs9:mas2019@mas-cluster-shard-00-00-whhsb.mongodb.net:27017,mas-cluster-shard-00-01-whhsb.mongodb.net:27017,mas-cluster-shard-00-02-whhsb.mongodb.net:27017/mas-database?ssl=true&replicaSet=MAS-Cluster-shard-0&authSource=admin&retryWrites=true&w=majority";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useUnifiedTopology: true
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/User");
