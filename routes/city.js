const express = require("express");
const City = require("../controller/city");

const router = express.Router();

router.post("/add", City.insert);
router.get("/", City.read);

router.put("/edit/:id", City.edit);
router.delete("/delete/:id", City.delete);

module.exports = router;
