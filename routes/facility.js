const express = require("express");
const Facility = require("../controller/facility");

const router = express.Router();

router.post("/add", Facility.insert);
router.get("/", Facility.read);
router.put("/edit/:id", Facility.edit);
router.delete("/delete/:id", Facility.delete);

module.exports = router;
