const express = require("express");
const Complaint = require("../controller/complaint");
const auth = require("../middleware/auth");
const checkUserVerification = require("../middleware/checkUserVerification");
const router = express.Router();

router.get("/", Complaint.read);
router.post("/", [auth, checkUserVerification], Complaint.insert);
router.put("/approve/:id", Complaint.approve);
router.put("/reject/:id", Complaint.reject);
// router.get("/MyApplications", Application.findByUser);
// router.get("/", Application.findByRoom);
router.get("/:id", Complaint.getComplaintbyId);

module.exports = router;
