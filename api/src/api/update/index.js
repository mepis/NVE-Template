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

router.post("/updatePantry", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "updatePantry",
  };
  try {
    const payload = req.body.data;
    const doesPantryItemExist = await Pantry.findById(payload._id);
    if (doesPantryItemExist) {
      response.data = await Pantry.findByIdAndUpdate(payload._id, payload);
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

router.post("/updateRecipe", async function (req, res) {
  let response = {
    data: {},
    status: "",
    message: "",
    endpoint: "updateRecipe",
  };
  try {
    const payload = req.body.data;
    const doesRecipeExist = await Recipe.findById(payload._id);
    if (doesRecipeExist) {
      response.data = await Recipe.findByIdAndUpdate(payload._id, payload);
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

router.post("/updateUser", async function (req, res) {
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
