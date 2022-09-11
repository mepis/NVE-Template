const mongoose = require("../configs/dbConfig.js");

const pantry = new mongoose.Schema({
  pantry: [],
  owner: String,
  dateAdded: {type: Date, default: Date.now},
});

const Pantry = mongoose.model("pantry", pantry);

module.exports = Pantry;
