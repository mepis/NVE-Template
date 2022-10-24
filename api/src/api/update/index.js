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
