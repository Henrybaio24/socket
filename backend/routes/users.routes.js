const express = require("express");

let api = express.Router(),
  userController = require("../controllers/users.controller");

api.post("/login", userController.login);

module.exports = api;
