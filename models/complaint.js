const mongoose = require("mongoose");
const Joi = require("Joi");

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  roomId: String,
  reportType: String,
  reportDescription: String,
  status: {
    type: String,
    required: true,
    enum: ["Submitted", "Approved", "Rejected"],
    default: "Submitted",
  },
  dateSubmitted: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

function validateComplaint(complaint) {
  const schema = Joi.object({
    reportType: Joi.string().required(),
    reportDescription: Joi.string().min(20).max(150).required(),
  });
  return schema.validate(complaint);
}

module.exports.validateComplaint = validateComplaint;
module.exports.Complaint = Complaint;
