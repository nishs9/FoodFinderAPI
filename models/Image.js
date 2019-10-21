const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://nishs9:mas2019@mas-cluster-shard-00-00-whhsb.mongodb.net:27017,mas-cluster-shard-00-01-whhsb.mongodb.net:27017,mas-cluster-shard-00-02-whhsb.mongodb.net:27017/mas-database?ssl=true&replicaSet=MAS-Cluster-shard-0&authSource=admin&retryWrites=true&w=majority");

autoIncrement.initialize(connection);

const ImageSchema = new Schema({
  imgID: {
    type: Number,
    required: true
  },
  img: {
      data: Buffer
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Image", ImageSchema);

ImageSchema.plugin(autoIncrement.plugin, {
    model: 'Image',
    field: 'imgID',
    startAt: '1000',
    incrementBy: '1',
});
