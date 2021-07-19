const mongoose = require("mongoose");
const Joi = require("Joi");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  sourceOfIncome: String,
  monthlyIncome: Number,
  emergencyContact: String,
  previousLocation: String,
  previousMovedInDate: Date,
  reasonToLeave: String,
  status: {
    type: String,
    required: true,
    enum: ["Draft", "Submitted", "Approved", "Rejected"],
    default: "Draft",
  },
  dateSubmitted: {
    type: Date,
  },
});

const Application = mongoose.model("Application", applicationSchema);

function validateApplication(application) {
  const schema = Joi.object({
    sourceOfIncome: Joi.string().min(3).max(255).required(),
    monthlyIncome: Joi.string().min(100).max(1000000).required(),
    emegencyContact: Joi.string().min(10).max(10).required(),
    previousLocation: Joi.string().min(3).max(255).required(),
    previousMovedInDate: Joi.date(),
    reasonToLeave: Joi.string().min(150).max(500).required(),
  });
  return schema.validate(application);
}

module.exports.validateApplication = validateApplication;
module.exports.Application = Application;
