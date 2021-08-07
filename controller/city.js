const City = require("../models/city");

module.exports = {
  insert: async (req, res) => {
    const city = new City({
      name: req.body.name,
      totalWard: req.body.totalWard,
      map: {
        lng: req.body.lng,
        lat: req.body.lat,
        zoom: req.body.zoom,
        marker: req.body.marker,
      },
    });
    await city.save();
    res.send(city.name + " has beed sucessfully added");
  },
  read: async (req, res) => {
    const cities = await City.find();
    res.send(cities);
  },

  delete: async (req, res) => {
    const cities = await City.findByIdAndDelete({ _id: req.params.id });
    if (!cities) return res.status(404).send("City Already Deleted");
    res.status(201).send(cities);
  },
  edit: async (req, res) => {
    let cities = await City.findById(req.params.id);
    if (!cities) return res.status(404).send("City not Found");

    cities.set({
      name: req.body.name,
      totalWard: req.body.totalWard,
    });
    await cities.save();
    res.status(200).send(cities.name + " was editted");
  },
};
