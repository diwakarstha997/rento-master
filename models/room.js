const mongoose = require("mongoose");
const Joi = require("joi");

const roomSchema = new mongoose.Schema({
  roomTag: {
    type: String,
  },
  userName: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  facility: [String],
  city: String,
  wardNumber: Number,
  location: String,
  lng: String,
  lat: String,
  zoom: String,
  marker: Array,
  monthlyRent: Number,
  squareFeet: Number,
  image: [String],
  description: {
    type: String,
    required: true,
    max: 500,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Inactive", "Blocked"],
    default: "Inactive",
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
  datePublished: {
    type: Date,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Room = mongoose.model("Room", roomSchema);

function validateRoom(room) {
  const schema = Joi.object({
    facility: Joi.required(),
    city: Joi.string().required(),
    wardNumber: Joi.number().required(),
    location: Joi.string().min(3).max(255).required(),
    monthlyRent: Joi.number().min(100).max(1000000).required(),
    squareFeet: Joi.number().min(10).max(1000000).required(),
    description: Joi.string().max(500).required(),
    image: Joi.required(),
  });
  return schema.validate(room);
}

module.exports.validateRoom = validateRoom;
module.exports.Room = Room;
