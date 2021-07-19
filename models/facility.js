const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;
