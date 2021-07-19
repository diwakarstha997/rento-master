const Facility = require("../models/facility");

module.exports = {
  insert: async (req, res) => {
    if (!req.body.name)
      return res.status(400).send("Please provide facility name");

    const facility = new Facility({
      name: req.body.name,
      icon: req.body.icon,
    });
    await facility.save();
    res.send(facility);
  },
  read: async (req, res) => {
    const facilities = await Facility.find();
    res.send(facilities);
  },
};
