const jwt = require("jsonwebtoken");
const config = process.env;
const redisClient = require("./../configs/redisConfig.js");

const verifyToken = async (req, res, next) => {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "auth",
  };
  const userEmail = req.body.email;
  const redisClient = await redisClient.get(userEmail); // <- this is causing an issue, don't know what I named it that, and I'm not referencing the actual stored token anywhere
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    response.data = { error: "Authentication token is missing" };
    response.status = "fail";
    response.message = "Failed";
    return res.status(403).send(response);
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user.didAuthenticate = decoded;
  } catch (err) {
    response.data = { error: "Invalid token" };
    response.status = "fail";
    response.message = "Failed";
    return res.status(401).send(response);
  }
  return next();
};

module.exports = verifyToken;
