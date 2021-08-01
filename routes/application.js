const express = require("express");
const Application = require("../controller/application");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, Application.insert);
router.get("/TenantApplications", auth, Application.findTenantApplications);
router.get(
  "/RoomOwnerApplications",
  auth,
  Application.findRoomOwnerApplications
);
router.get("/room/:id", auth, Application.findByRoomId);
router.get("/application/:id", auth, Application.findByApplicationId);
router.post("/status", Application.changeStatus);

module.exports = router;
