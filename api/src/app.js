require("dotenv").config();
const express = require("express"); //node module for http services
let cors = require("cors");
const helmet = require("helmet");
const create = require("./api/create/index.js");
const update = require("./api/update/index.js");
const read = require("./api/read/index.js");
const del = require("./api/delete/index.js");
const corsOptions = require("./middleware/CORS_WHITELIST");

const app = express();
const port = process.env.PORT || 3001; // looks for enviroment variable for port, if one does not exist, use port 3000 instead, fot listening to HTTP ports

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.options("/api/create/", cors());
app.use("/api/create/", create);

app.options("/api/update/", cors());
app.use("/api/update/", update);

app.options("/api/read/", cors());
app.use("/api/read/", read);

app.options("/api/delete/", cors());
app.use("/api/delete/", del);

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
