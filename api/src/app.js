require("dotenv").config();
const express = require("express"); //node module for http services
let cors = require("cors");
const helmet = require("helmet");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const create = require("./api/create/index.js");
const update = require("./api/update/index.js");
const read = require("./api/read/index.js");
const del = require("./api/delete/index.js");

const app = express();
const port = process.env.PORT || 3001; // looks for enviroment variable for port, if one does not exist, use port 3000 instead, fot listening to HTTP ports
const CORS_WHITELIST = [
  process.env.CORS_WHITELIST
];

let corsOptions = {
  origin: (origin, callback) => {
    if (!origin || CORS_WHITELIST.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("Prohibited by CORS"));
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

let checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: process.env.AUTH0_JWKSREQUESTSPERMINUTE,
    jwksUri: process.env.AUTH0_JWKSURI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: [process.env.AUTH0_ALGO],
});

//protected routes
app.use(checkJwt);

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
