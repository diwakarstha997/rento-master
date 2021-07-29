const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/register", User.insert);
router.post("/verify", User.verify);
router.get("/getTotal", User.getTotal);
router.get("/createdToday", User.createdToday);

module.exports = router;
