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

router.post("/readAllPantryItem", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
  };
  const user = req.body.data;
  try {
    const pantryItems = await Pantry.find({ owner: user.email }).sort({
      dateAdded: -1,
    });
    response.data = pantryItems;
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

router.post("/readAllRecipes", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
  };
  const user = req.body.data;
  try {
    const recipes = await Recipe.find({ owner: user.email }).sort({
      dateAdded: -1,
    });
    response.data = recipes;
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

router.post("/readAllUsers", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
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
