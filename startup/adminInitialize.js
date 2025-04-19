const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Facility = require("../models/facility");
const City = require("../models/city");

module.exports = async function () {
  try {
    let admin = await User.findOne({ userRole: "Admin" });
    if (admin) return;
    const user = new User({
      userRole: "Admin",
      name: "Admin",
      email: "rentoadmin@gmail.com",
      password: "admin",
      phone: "9849499150",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const facility = new Facility({
      name: "water",
      icon: "fa-tint",
    });
    await facility.save();
    const cities = new City({
      map: {
        marker: [85.3197604326212, 27.700292658106548],

        lng: "85.3041",
        lat: "27.7048",
        zoom: "10",
      },
      name: "kathmandu",
      totalWard: 32,
    });
    await cities.save();
  } catch (ex) {
    console.log(ex);
    process.exit();
  }
};
