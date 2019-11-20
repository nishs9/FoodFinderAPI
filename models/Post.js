const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

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
    type: String
  },
  likes: {
    type: Number
  },
  imgPointer: {
    type: ObjectId
  },
  healthDescriptors: {
    type: Array
  },
  dietaryRestrictions: {
    type: Array
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Posts", PostSchema);
