const { Room, validateRoom } = require("../models/room");
const upload = require("../middleware/upload");
const _ = require("lodash");
const { User } = require("../models/user");

module.exports = {
  insert: async (req, res) => {
    // await upload(req, res);

    // const { error } = validateRoom(req.body);

    // if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    const roomCount = await Room.find({
      user: { _id: req.user._id },
    }).countDocuments();
    req.body.roomTag = `${user.userTag}-${roomCount}`;

    //post room
    const room = new Room({
      roomTag: req.body.roomTag,
      userName: user.name,
      user: req.user._id,
      city: req.body.city,
      wardNumber: req.body.wardNumber,
      location: req.body.location,
      facility: req.body.facility,
      monthlyRent: req.body.monthlyRent,
      squareFeet: req.body.squareFeet,
      description: req.body.description,
      image: req.body.imagePath,
    });
    await room.save();

    console.log("room saved successfully");
    res.send("room saved successfully");
  },

  updatePublishStatus: async (req, res) => {
    let data = _.pick(req.body, ["status"]);
    if (req.body.status === "Active") {
      req.body.datePublished = Date.now();
      data = _.pick(req.body, ["status", "datePublished"]);
    }

    await Room.updateMany({ _id: req.body.id }, data);
    res.send("room updated successfully");
  },

  read: async (req, res) => {
    //get rooms
    const rooms = await Room.find({ status: "Active" });
    res.send(rooms);
  },

  findById: async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send("File not Found");

    if (room.status !== "Active") return res.status(404).send("File not Found");

    res.send(room);
  },

  findByUser: async (req, res) => {
    const rooms = await Room.find({ user: { _id: req.user._id } });
    if (!rooms) return res.send("There are no rooms in database");

    res.send(rooms);
  },

  update: async (req, res) => {
    //Update rooms
    const room = await Room.findById({ _id: req.params.id });
    if (!room) return res.status(404).send("Room Doesn't Exists");

    room.set({
      user: req.user._id,
      location: req.body.location,
      facility: re.body.facilities,
      monthlyRent: req.body.price,
      squareFeet: req.body.squareFeet,
      description: req.body.description,
    });
    await room.save();

    console.log("room updated successfully");
    res.send("room updated successfully");
  },

  delete: async (req, res) => {
    //delete rooms
    const room = await Room.findById({ _id: req.params.id });
    if (!room) return res.status(404).send("Room Already Deleted");

    // const result = await Room.findByIdAndDelete({ _id: req.params.id });
    room.delete();

    res.send("room deleted successfully");
  },

  getTotal: async (req, res) => {
    const total = await Room.find().countDocuments();
    res.send("" + total);
  },

  createdToday: async (req, res) => {
    const data = await Room.find({
      dateCreated: new Date().toISOString().slice(0, 10),
    }).countDocuments();
    res.send("" + data);
  },
};
