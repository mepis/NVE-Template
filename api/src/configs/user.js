const mongoose = require("../configs/dbConfig.js");

const user = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  lastUpdated: String,
  password: String,
  email: { type: String, unique: true },
  emailVerified: false,
  dateAdded: {type: Date, default: Date.now},
});

const User = mongoose.model("users", user);

module.exports = User;
