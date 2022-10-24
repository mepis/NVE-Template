const mongoose = require("../configs/dbConfig.js");

const user = new mongoose.Schema({
  nickname: String,
  firstName: String,
  lastName: String,
  picture: String,
  lastUpdated: String,
  email: { type: String, unique: true },
  email_verified: false,
  dateAdded: {type: Date, default: Date.now},
});

const User = mongoose.model("users", user);

module.exports = User;
