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
    const checkRoom = await Room.findOne({
      _id: req.body.roomId,
    });
    if (!checkRoom) return res.status(400).send("Room Doesnot Exist!!!");

    const application = new Application({
      user: req.user._id,
      room: req.body.roomId,
      occupation: req.body.sourceOfIncome,
      monthlyIncome: req.body.monthlyIncome,
      emegencyContact: req.body.emegencyContact,
      previousLocation: req.body.Location,
      reasonToLeavePreviousLocation: req.body.reasonToLeavePreviousLocation,
      additionalComments: req.body.additionalComments,
    });
    await application.save();
    res.send("application created successfully");
  },

  find: async (req, res) => {
    console.log(req.params);
    const application = await Application.findOne({
      user: req.user._id,
      room: req.params.id,
    });
    if (!application) res.send(null);
    else return res.send(application);
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
