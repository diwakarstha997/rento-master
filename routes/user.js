const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/register", User.insert);
router.post("/verify", User.verify);

router.get("/getTotal", User.getTotalUser);
router.get("/createdToday", User.userCreatedToday);

module.exports = router;
