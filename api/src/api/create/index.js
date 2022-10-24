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

app.post("/createUser", async (req, res) => {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "createUser",
  };

  try {
    // Get user input
    const { firstName, lastName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      response.data = { error: "All input is required" };
      response.status = "fail";
      response.message = "Failed";
      return res.status(400).send(response);
    }

    // check if user already exist
    // Validate if user exist in our database
    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) {
      response.data = { error: "User Already Exist. Please Login" };
      response.status = "fail";
      response.message = "Failed";
      return res.status(400).send(response);
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

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

    // return new user
    response.data = {
      message: "Your account has been created",
      userToken: user.token
    };
    response.status = "pass";
    response.message = "Success";
    return res.status(201).send(response);
  } catch (err) {
    response.data = { error: err };
    response.status = "fail";
    response.message = "Failed";
    return res.status(400).send(response);
  }
});


module.exports = router;
