const City = require("../models/city");

module.exports = {
  insert: async (req, res) => {
    const city = new City({
      name: req.body.name,
      totalWard: req.body.totalWard,
    });
    await city.save();
    res.send(city);
  },
  read: async (req, res) => {
    const cities = await City.find();
    res.send(cities);
  },
};
