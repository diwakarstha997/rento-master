const express = require("express");
const User = require("../controller/user");
const auth = require("../middleware/auth");
const setImagePath = require("../middleware/imagePath");

const router = express.Router();

router.post("/register", User.insert);

router.post(
  "/documentUpload",
  [auth, setImagePath("user_assets/profile/")],
  User.uploadDocument
);

router.get("/", [auth], User.fetchUserData);
router.get("/getTotal", [auth], User.getTotalUser);
router.get("/createdToday", [auth], User.userCreatedToday);
router.get("/getVerifyUser", [auth], User.getVerifyUser);

router.put("/verify", [auth], User.verify);
router.put("/decline", [auth], User.decline);
router.put("/changePassword", User.changePassword);
router.put("/editProfile", User.editProfileData);

module.exports = router;
