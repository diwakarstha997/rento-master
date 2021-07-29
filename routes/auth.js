const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/", User.login);
router.post("/adminLogin", User.adminLogin);

module.exports = router;
