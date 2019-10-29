const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  img: {
      data: Buffer,
      contentType: String
  },
  postTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("PostData", PostSchema);
