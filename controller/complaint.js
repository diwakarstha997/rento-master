const { Complaint, validateComplaint } = require("../models/complaint");
const { Room } = require("../models/room");
const { User } = require("../models/user");

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

    console.log(req.body.roomId);
    const checkRoom = await Room.findOne({
      _id: req.body.roomId,
    });
    if (!checkRoom) return res.status(400).send("Room Doesnot Exist!!!");
    const checkUser = await User.findOne({
      _id: checkRoom.user,
    });

    const complaint = new Complaint({
      user: req.user._id,
      userName: checkUser.name,
      room: req.body.roomId,
      roomId: checkRoom.roomTag,
      reportType: req.body.reportType,
      reportDescription: req.body.reportDescription,
    });
    await complaint.save();
    res.send("Complaint created successfully");
  },

  read: async (req, res) => {
    const complaints = await Complaint.find({ status: "Submitted" });
    res.send(complaints);
  },

  approve: async (req, res) => {
    const complaints = await Complaint.findById(req.params.id);
    if (!complaints) return res.status(404).send("complaints not Found");

    let rooms = await Room.findById(complaints.room);

    complaints.set({
      status: "Approved",
    });
    complaints.save();

    rooms.set({
      status: "Blocked",
    });
    rooms.save();

    res.status(200).send(`Room ${rooms.roomTag} was blocked`);
  },

  reject: async (req, res) => {
    const complaints = await Complaint.findById(req.params.id);
    if (!complaints) return res.status(404).send("complaints not Found");

    complaints.set({
      status: "Rejected",
    });

    complaints.save();
    res.status(200).send("Complain was Dismissed");
  },

  getComplaintbyId: async (req, res) => {
    const complaints = await Complaint.findById(req.params.id);
    res.send(complaints);
  },

  //   findByUser: "finds user specific application",
  //   findByRoom: "finds all application",
};
