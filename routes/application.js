const express = require("express");
const Application = require("../controller/application");
const auth = require("../middleware/auth");
const checkUserVerification = require("../middleware/checkUserVerification");

const router = express.Router();

router.post("/", [auth, checkUserVerification], Application.insert);
router.get("/TenantApplications", [auth], Application.findTenantApplications);
router.get(
  "/RoomOwnerApplications",
  auth,
  Application.findRoomOwnerApplications
);
router.get("/room/:id", auth, Application.findByRoomId);
router.get("/application/:id", auth, Application.findByApplicationId);
router.post("/status", Application.changeStatus);

router.put("/edit/:id", auth, Application.edit);
router.put("/cancel/:id", auth, Application.cancel);
router.put("/reject/:id", auth, Application.reject);
router.put("/approve/:id", auth, Application.approve);

router.put("/view/:id", auth, Application.view);
router.put("/view2/:id", auth, Application.view2);

module.exports = router;
