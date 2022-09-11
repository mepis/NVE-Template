const express = require("express"); //node module for http services
const router = express.Router();
const Pantry = require("../../configs/pantry");
const Recipe = require("../../configs/recipe");
const User = require("../../configs/user");

router.get("/", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "What do you say to the god of death? Not today!",
  };
  return res.status(500).json(response);
});

router.post("/createPantryItem", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
  };
  try {
    const data = req.body;
    const newPantry = new Pantry(data);
    await newPantry.save();
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

router.post("/createRecipe", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
  };
  try {
    const data = req.body;
    const newRecipe = new Recipe(data);
    await newRecipe.save();
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

router.post("/createUser", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
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
