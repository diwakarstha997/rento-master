const express = require("express");
const Facility = require("../controller/facility");

const router = express.Router();

router.post("/add", Facility.insert);
router.get("/", Facility.read);

module.exports = router;
