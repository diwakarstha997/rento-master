const express = require("express");
const User = require("../controller/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", User.insert);
router.post("/verify", [auth], User.verify);

router.get("/", [auth], User.fetchUserData);

router.put("/changePassword", User.changePassword);
router.put("/editProfile", User.editProfileData);
router.get("/getTotal", [auth], User.getTotalUser);
router.get("/createdToday", [auth], User.userCreatedToday);

module.exports = router;
