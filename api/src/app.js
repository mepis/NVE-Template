require("dotenv").config();
const express = require("express"); //node module for http services
const cors = require("cors");
const helmet = require("helmet");
const corsOptions = require("./middleware/cors.js");

// endpoints
const user = require("./api/user/index.js");
const logging = require("./api/logging/index.js");

const app = express();
const port = process.env.PORT || 3001; // looks for enviroment variable for port, if one does not exist, use port 3000 instead, fot listening to HTTP ports

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.options("/api/user/", cors());
app.use("/api/user/", user);

app.options("/api/logging/", cors());
app.use("/api/logging/", logging);

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
