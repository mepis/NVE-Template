const express = require("express"); //node module for http services
const router = express.Router();
const Logs = require("../../configs/user");
const auth = require("../../middleware/auth");

router.get("/", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "What do you say to the god of death? Not today!",
  };
  return res.status(200).json(response);
});

router.post("/addLog", auth, async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "addLog",
  };
  const logData = req.body.data.logData;
  try {
    const didLogUpdate = await Logs.create(logData);
    if (didLogUpdate) {
      response.status = "pass";
      response.message = "Success";
      return res.status(200).json(response);
    }
  } catch (err) {
    console.log("/addLog error: ", err);
    response.data = { error: err };
    response.status = "fail";
    response.message = "Fail";
    return res.status(200).json(response);
  }
});

module.exports = router;
