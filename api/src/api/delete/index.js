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

router.post("/deleteUser", async function (req, res) {
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

module.exports = router;
