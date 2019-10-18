const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PostData", UserSchema);
