const express = require("express");
const City = require("../controller/city");

const router = express.Router();

router.post("/add", City.insert);
router.get("/", City.read);

module.exports = router;
