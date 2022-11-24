const mongoose = require("../configs/dbConfig.js");

const log = new mongoose.Schema({
  fileName: String,
  methodName: String,
  errorMessage: {},
  dateAdded: {type: Date, default: Date.now},
});

const Logs = mongoose.model("logs", log);

module.exports = Logs;
