const { Application, validateApplication } = require("../models/application");
const { Room } = require("../models/room");
const { User } = require("../models/user");

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
      pets: req.body.pets,
      noOfRoomMates: req.body.noOfRoomMates,
      noOfChildrens: req.body.noOfChildrens,
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
      .populate({
        path: "room",
        match: { status: "Active" },
        select: "_id roomTag",
      })
      .exec((err, application) => {
        if (err) {
          console.log(err);
          if (!application)
            return res.status(404).send("Application not Found");
        } else {
          console.log(application);
          if (!application)
            return res.status(404).send("Application not Found");
          res.send(application);
        }
      });
  },

  findTenantApplications: async (req, res) => {
    await Application.find({
      user: req.user._id,
    })
      .sort("-dateSubmitted")
      .populate({
        path: "room",
        // match: { status: "Active" },
        select: "_id roomTag",
      })
      .exec((err, application) => {
        if (err) {
          console.log(err);
        } else {
          console.log(application);
          if (application.status === "Approved" && room.status === "Inactive")
            return res.send(application);
          application.room = null;
          res.send(application);
        }
      });
  },

  findRoomOwnerApplications: async (req, res) => {
    const applications = await Application.find({
      roomOwner: req.user._id,
      status: { $ne: "Cancelled" },
    })
      .sort("-dateSubmitted")
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

  edit: async (req, res) => {
    const { error } = validateApplication(req.body);
    if (!error) return res.status(400).send("Invalid Data");

    const application = await Application.findOne({
      _id: req.params.id,
    });

    application.set({
      status: "Submitted",
      occupation: req.body.occupation,
      monthlyIncome: req.body.monthlyIncome,
      emergencyContact: req.body.emergencyContact,
      previousLocation: req.body.previousLocation,
      reasonToLeavePreviousLocation: req.body.reasonToLeavePreviousLocation,
      additionalComments: req.body.additionalComments,
      pets: req.body.pets,
      noOfRoomMates: req.body.noOfRoomMates,
      noOfChildrens: req.body.noOfChildrens,
    });

    await application.save();

    res.status(200).send("Application was editted");
  },

  cancel: async (req, res) => {
    const application = await Application.findOne({
      _id: req.params.id,
    });

    application.set({
      status: "Cancelled",
    });

    await application.save();

    res
      .status(200)
      .send(application.applicationTag + " Application was cancelled");
  },
  reject: async (req, res) => {
    const application = await Application.findOne({
      _id: req.params.id,
    });

    application.set({
      status: "Rejected",
      viewed: "true",
    });

    await application.save();

    res
      .status(200)
      .send(application.applicationTag + " Application was Rejected");
  },

  approve: async (req, res) => {
    const application = await Application.findOne({
      _id: req.params.id,
    });

    const user = await User.findOne({ _id: application.roomOwner });
    if (!user) res.send("505");
    console.log(user.name, user.phone);
    application.set({
      status: "Approved",
      viewed: "false",
      contactNo: user.phone,
    });
    await application.save();

    res
      .status(200)
      .send(application.applicationTag + " Application was Approved");
  },
  view: async (req, res) => {
    const application = await Application.findOne({
      _id: req.params.id,
    });

    application.set({
      viewed: "true",
    });

    await application.save();

    res.send("viewed");
  },

  view2: async (req, res) => {
    const application = await Application.findOne({
      _id: req.params.id,
    });

    application.set({
      viewed: "seen",
    });

    await application.save();

    res.send("viewed");
  },
  //   findByUser: "finds user specific application",
  //   findByRoom: "finds all application",
};
