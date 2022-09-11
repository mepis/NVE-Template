const mongoose = require("../configs/dbConfig.js");

const recipe = new mongoose.Schema({
  recipes: [],
  owner: String,
  dateAdded: {type: Date, default: Date.now},
});

const Recipe = mongoose.model("recipe", recipe);

module.exports = Recipe;
