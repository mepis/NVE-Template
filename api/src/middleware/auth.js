const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = async (req, res, next) => {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "auth",
  };
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
    console.log("Decoded: ", decoded);
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
