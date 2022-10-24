const express = require("express"); //node module for http services
const router = express.Router();
const User = require("../../configs/user");
const auth = require("../../middleware/auth");

router.get("/", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "What do you say to the god of death? Not today!",
  };
  return res.status(500).json(response);
});

app.post("/login", async (req, res) => {
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
      response.data = { error: "Both the email address and password are required" };
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

module.exports = router;
