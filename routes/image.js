const express = require("express");
const Image = require("../controller/image");

const router = express.Router();

router.post("/upload", Image.upload);

module.exports = router;
