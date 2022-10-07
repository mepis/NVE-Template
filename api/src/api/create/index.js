const express = require("express"); //node module for http services
const router = express.Router();
const User = require("../../configs/user");

router.get("/", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "What do you say to the god of death? Not today!",
  };
  return res.status(500).json(response);
});

router.post("/createUser", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "createUser",
  };
  try {
    const data = req.body;
    const user = new User(data);
    await user.save();
    response.status = "pass";
    response.message = "Success";
    return res.status(200).json(response);
  } catch (err) {
    response.data = { error: err };
    response.status = "fail";
    response.message = "Failed";
    return res.status(500).json(response);
  }
});

module.exports = router;
