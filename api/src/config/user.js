const mongoose = require("../configs/dbConfig.js");

const user = new mongoose.Schema({
  nickname: String,
  name: String,
  picture: String,
  updated_at: String,
  email: String,
  email_verified: false,
  dateAdded: {type: Date, default: Date.now},
});

const User = mongoose.model("users", user);

module.exports = User;
