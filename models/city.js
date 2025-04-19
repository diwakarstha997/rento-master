const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalWard: {
    type: Number,
    required: true,
  },
  // map: {
  //   lng: String,
  //   lat: String,
  //   zoom: String,
  //   marker: Array,
  // },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
