const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  job: {
    type: String,
  },
  imgPointer: {
    type: ObjectId
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UserData", UserSchema);
