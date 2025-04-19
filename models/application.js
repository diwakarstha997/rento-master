const mongoose = require("mongoose");
const Joi = require("joi");

const applicationSchema = new mongoose.Schema({
  applicationTag: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  roomOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  occupation: String,
  monthlyIncome: Number,
  emergencyContact: String,
  previousLocation: String,
  reasonToLeavePreviousLocation: String,
  additionalComments: String,
  status: {
    type: String,
    required: true,
    enum: ["Submitted", "Approved", "Rejected", "Cancelled"],
    default: "Submitted",
  },
  dateSubmitted: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
  contactNo: Number,
  viewed: {
    type: String,
    enum: ["submitted", "seen", "false", "true"],
    default: "submitted",
  },
  noOfRoomMates: { Type: Number, default: 0 },
  noOfChildrens: { Type: Number, default: 0 },
  pets: String,
});

const Application = mongoose.model("Application", applicationSchema);

function validateApplication(application) {
  const schema = Joi.object({
    occupation: Joi.string().min(3).max(255).required(),
    monthlyIncome: Joi.string().min(100).max(1000000).required(),
    emegencyContact: Joi.string().min(10).max(10).required(),
    previousLocation: Joi.string().min(3).max(255).required(),
    reasonToLeavePreviousLocation: Joi.string().max(500).required(),
    additionalComments: Joi.string().max(500).required(),
  });
  return schema.validate(application);
}

module.exports.validateApplication = validateApplication;
module.exports.Application = Application;
