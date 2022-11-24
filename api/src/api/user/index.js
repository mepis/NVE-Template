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

router.post("/deleteUser", auth, async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "deleteUser",
  };
  const user = req.body.data;
  try {
    const didUserDelete = await User.deleteOne(user._id);
    if (didUserDelete.deletedCount > 0) {
      response.status = "pass";
      response.message = "Success";
      return res.status(200).json(response);
    }
  } catch (err) {
    console.log("/deleteJob error: ", err);
    response.data = { error: err };
    response.status = "fail";
    response.message = "Fail";
    return res.status(500).json(response);
  }
});

router.post("/login", async (req, res) => {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "login",
  };

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      response.data = { error: "Both an email address and password are required to login." };
      response.status = "fail";
      response.message = "Failed";
      return res.status(400).send(response);
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      response.data = {
        message: "You are now logged in",
        userToken: token
      };
      response.status = "pass";
      response.message = "Success";
      return res.status(200).send(response);
      res.status(200).json(user);
    } else {
      response.data = { error: "Email and/or password are not correct" };
      response.status = "fail";
      response.message = "Failed";
      return res.status(400).send(response);
    }
  } catch (err) {
    response.data = { error: err };
    response.status = "fail";
    response.message = "Failed";
    return res.status(400).send(response);
  }
});

router.post("/readUsers", auth, async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "readAllUsers",
  };
  try {
    const users = await User.find().sort({
      dateAdded: -1,
    });
    response.data = users;
    response.status = "pass";
    response.message = "Success";
    return res.status(200).json(response);
  } catch (err) {
    response.data = { error: err };
    response.status = "fail";
    response.message = "Fail";
    return res.status(500).json(err);
  }
});

router.post("/updateUser", auth, async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "updateUser",
  };
  try {
    const payload = req.body.data;
    const doesUserExist = await User.findById(payload._id);
    if (doesUserExist) {
      response.data = await User.findByIdAndUpdate(payload._id, payload);
      response.status = "pass";
      response.message = "Succss";
      return res.status(200).json(response);
    } else {
      response.status = "fail";
      response.message = "Fail";
      return res.status(200).json(response);
    }
  } catch (err) {
    response.data = { error: err };
    response.status = "fail";
    response.message = "Fail";
    return res.status(200).json(response);
  }
});

module.exports = router;
