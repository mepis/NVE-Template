const mongoose = require("mongoose");
require('dotenv').config();
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db..."))
  .catch((err) => console.log("error connecting to db: ", err));
mongoose.pluralize(null);

module.exports = mongoose;