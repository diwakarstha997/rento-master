const { Complaint, validateComplaint } = require("../models/complaint");
const { Room } = require("../models/room");

module.exports = {
  insert: async (req, res) => {
    const { error } = validateComplaint(req.body);
    if (!error) return res.status(400).send("Invalid Data");

    const checkComplaint = await Complaint.findOne({
      user: req.user._id,
      room: req.body.roomId,
    });
    if (checkComplaint)
      return res.status(400).send("Complaint Already Submitted");

    const checkRoom = await Room.findOne({
      _id: req.body.roomId,
    });
    if (!checkRoom) return res.status(400).send("Room Doesnot Exist!!!");

    const complaint = new Complaint({
      user: req.user._id,
      room: req.body.roomId,
      reportType: req.body.reportType,
      reportDescription: req.body.reportDescription,
    });
    await complaint.save();
    res.send("Complaint created successfully");
  },

  changeStatus: async (req, res) => {
    await Complaint.updateMany(
      { _id: req.body.id },
      _.pick(req.body, ["status"])
    );
    res.send("Complaint updated successfully");
  },
  //   findByUser: "finds user specific application",
  //   findByRoom: "finds all application",
};
