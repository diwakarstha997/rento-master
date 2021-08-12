const Facility = require("../models/facility");

module.exports = {
  insert: async (req, res) => {
    if (!req.body.name)
      return res.status(400).send("Please provide facility name");

    const facilityName = req.body.name.replace(/ /g, "").toLowerCase();

    const checkFacility = await Facility.findOne({ name: facilityName });
    if (checkFacility)
      return res
        .status(400)
        .send("Facility Already Added Choose different name");

    const facility = new Facility({
      name: facilityName,
      icon: req.body.icon,
    });
    await facility.save();
    res.status(200).send("Facility " + facility.name + " succesfully added");
  },
  read: async (req, res) => {
    const facilities = await Facility.find();
    res.send(facilities);
  },

  delete: async (req, res) => {
    const facility = await Facility.findByIdAndDelete({ _id: req.params.id });
    if (!facility) return res.status(404).send("Facility Already Deleted");

    // const result = await Room.findByIdAndDelete({ _id: req.params.id });
    // facility.delete();
    // res.send(facility);
    res.status(201).send(facility);
  },
  edit: async (req, res) => {
    let facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).send("Facility not Found");

    facility.set({
      name: req.body.name,
      icon: req.body.icon,
    });
    await facility.save();
    res.status(200).send(facility.name + " was editted");
  },
};
