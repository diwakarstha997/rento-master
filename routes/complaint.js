const express = require("express");
const Complaint = require("../controller/complaint");
const auth = require("../middleware/auth");
const checkUserVerification = require("../middleware/checkUserVerification");
const router = express.Router();

router.post("/", [auth, checkUserVerification], Complaint.insert);
router.post("/status", Complaint.changeStatus);
// router.get("/MyApplications", Application.findByUser);
// router.get("/", Application.findByRoom);

module.exports = router;
