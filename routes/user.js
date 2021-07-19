const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/register", User.insert);
router.post("/verify", User.verify);

module.exports = router;
