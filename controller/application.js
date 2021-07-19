const { Application, validateApplication } = require("../models/application");

module.exports = {
  insert: async (req, res) => {
    const { error } = validateApplication(req.body);
    if (!error) return res.status(400).send("Invalid Data");

    const checkApplication = Application.findOne({
      user: req.user._id,
      room: req.body.roomId,
    });
    if (checkApplication) return res.status(400).send("Invalid Request");

    const application = new Application({
      user: req.user._id,
      room: req.body.roomId,
      sourceOfIncome: req.body.sourceOfIncome,
      monthlyIncome: req.body.monthlyIncome,
      emegencyContact: req.body.emegencyContact,
      previousLocation: req.body.Location,
      previousMovedInDate: req.body.movedInDate,
      reasonToLeave: req.body.reasonToLeave,
    });
    await application.save();
    res.send("application created successfully");
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
