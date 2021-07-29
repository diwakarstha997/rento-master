const mongoose = require("mongoose");
const Joi = require("Joi");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    enum: ["Draft", "Submitted", "Approved", "Rejected"],
    default: "Draft",
  },
  dateSubmitted: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
});

const Application = mongoose.model("Application", applicationSchema);

function validateApplication(application) {
  const schema = Joi.object({
    occupation: Joi.string().min(3).max(255).required(),
    monthlyIncome: Joi.string().min(100).max(1000000).required(),
    emegencyContact: Joi.string().min(10).max(10).required(),
    previousLocation: Joi.string().min(3).max(255).required(),
    reasonToLeavePreviousLocation: Joi.string().min(20).max(500).required(),
    additionalComments: Joi.string().min(150).max(500).required(),
  });
  return schema.validate(application);
}

module.exports.validateApplication = validateApplication;
module.exports.Application = Application;
