let jwt = require("jsonwebtoken");
const redisClient = require("./../configs/redisConfig.js");

// update below with adding token to reddis

async function createToken(id, email) {
  return new Promise(async (resolve, reject) => {
    // Create token
    const token = jwt.sign(
      {
        userID: id,
        userEmail: email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    await redisClient.set(email, token);
    resolve(token);
  });
}

module.exports = createToken;
