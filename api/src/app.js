require("dotenv").config();
const express = require("express"); //node module for http services
let cors = require("cors");
const helmet = require("helmet");
const user = require("./api/user/index.js");
const corsOptions = require("./middleware/cors.js");

const app = express();
const port = process.env.PORT || 3001; // looks for enviroment variable for port, if one does not exist, use port 3000 instead, fot listening to HTTP ports

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.options("/api/user/", cors());
app.use("/api/user/", user);

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
