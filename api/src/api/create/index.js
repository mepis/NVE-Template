const express = require("express"); //node module for http services
const router = express.Router();
const User = require("../../configs/user");
const auth = require("../../middleware/auth");
const tokens = require("../../utils/token");
const bcrypt = require("bcrypt");

router.get("/", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "What do you say to the god of death? Not today!",
  };
  return res.status(200).json(response);
});

router.post("/createUser", async (req, res) => {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "createUser",
  };

  try {
    const userName = req.body.data.userName;
    const firstName = req.body.data.firstName;
    const lastName = req.body.data.lastName;
    const email = req.body.data.email;
    const password = req.body.data.password;

    // Validate user input
    if (!(email && password && firstName && lastName && userName)) {
      if (process.env.DEBUG) {
        console.log(
          " Error: email, password, firstName, lastName, userName - missing from req.body"
        );
      }
      response.data = { error: "All input is required" };
      response.status = "fail";
      response.message = "Failed";
      return res.status(400).send(response);
    }

    // check if user already exist
    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) {
      if (process.env.DEBUG) {
        console.log(" Error: user already exists: ", email);
      }
      response.data = { error: "User Already Exist. Please Login" };
      response.status = "fail";
      response.message = "Failed";
      return res.status(200).send(response);
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      userName,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      emailVerified: false,
    });

    // Create token
    const token = await tokens.createToken(user._id, email);

    // save user token
    user.token = token;
    user.password = "";

    // return new user
    response.data = {
      message: "Your account has been created",
      user: user,
    };
    response.status = "pass";
    response.message = "Success";
    return res.status(201).send(response);
  } catch (err) {
    if (process.env.DEBUG) {
      console.log(" Error: ", err);
    }
    response.data = { error: err };
    response.status = "fail";
    response.message = "Failed";
    return res.status(200).send(response);
  }
});

module.exports = router;
