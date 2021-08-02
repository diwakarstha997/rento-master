const { Application, validateApplication } = require("../models/application");
const { Room } = require("../models/room");

module.exports = {
  insert: async (req, res) => {
    const { error } = validateApplication(req.body);
    if (!error) return res.status(400).send("Invalid Data");

    const checkApplication = await Application.findOne({
      user: req.user._id,
      room: req.body.roomId,
    });
    console.log("submittedApplication", checkApplication);
    if (checkApplication)
      return res.status(400).send("Application Already Submitted");

    console.log(req.body.roomId);
    const room = await Room.findOne({
      _id: req.body.roomId,
    });
    if (!room) return res.status(400).send("Room Doesnot Exist!!!");

    const applicationTag =
      room.roomTag +
      "-" +
      (await Application.find({
        user: req.user._id,
      }).countDocuments());

    const application = new Application({
      applicationTag: applicationTag,
      user: req.user._id,
      roomOwner: room.user,
      room: req.body.roomId,
      occupation: req.body.occupation,
      monthlyIncome: req.body.monthlyIncome,
      emergencyContact: req.body.emergencyContact,
      previousLocation: req.body.previousLocation,
      reasonToLeavePreviousLocation: req.body.reasonToLeavePreviousLocation,
      additionalComments: req.body.additionalComments,
    });
    await application.save();
    res.send("application created successfully");
  },

  findByRoomId: async (req, res) => {
    await Application.findOne({
      user: req.user._id,
      room: req.params.id,
    })
      .populate({ path: "room", select: "_id" })
      .populate({ path: "room", select: "roomTag" })
      .exec((err, application) => {
        if (err) {
          console.log(err);
        } else {
          console.log(application);
          res.send(application);
        }
      });
  },

  findByApplicationId: async (req, res) => {
    await Application.findOne({
      user: req.user._id,
      _id: req.params.id,
    })
      .populate({ path: "room", select: "_id" })
      .populate({ path: "room", select: "roomTag" })
      .exec((err, application) => {
        if (err) {
          console.log(err);
        } else {
          console.log(application);
          res.send(application);
        }
      });
  },

  findTenantApplications: async (req, res) => {
    await Application.find({
      user: req.user._id,
    })
      .populate({ path: "room", select: "_id" })
      .populate({ path: "room", select: "roomTag" })
      .exec((err, application) => {
        if (err) {
          console.log(err);
        } else {
          console.log(application);
          res.send(application);
        }
      });
  },

  findRoomOwnerApplications: async (req, res) => {
    const applications = await Application.find({
      roomOwner: req.user._id,
    })
      .populate("room")
      .exec((err, application) => {
        if (err) {
          console.log(err);
        } else {
          console.log(application);
          res.send(application);
        }
      });
  },

  changeStatus: async (req, res) => {
    let data = _.pick(req.body, ["status"]);
    if (req.body.status === "Submitted") {
      req.body.dateSubmitted = Date.now();
      data = _.pick(req.body, ["status", "dateSubmitted"]);
    }

    await Application.updateMany({ _id: req.body.id }, data);
    res.send("application updated successfully");
  },
  //   findByUser: "finds user specific application",
  //   findByRoom: "finds all application",
};
