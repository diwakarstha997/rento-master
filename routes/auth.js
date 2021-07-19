const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/", User.login);

module.exports = router;
