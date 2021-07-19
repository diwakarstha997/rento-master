const express = require("express");
const Application = require("../controller/application");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, Application.insert);
router.post("/status", Application.changeStatus);
// router.get("/MyApplications", Application.findByUser);
// router.get("/", Application.findByRoom);

module.exports = router;
