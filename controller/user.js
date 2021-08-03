const { User, validateRegister, validateLogin } = require("../models/user");
const upload = require("../middleware/upload");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

module.exports = {
  insert: async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists !!");

    const userCount = await User.find().countDocuments();
    req.body.userTag = `RR${userCount}`;

    //create user
    user = new User(
      _.pick(req.body, [
        "name",
        "email",
        "password",
        "phone",
        "userRole",
        "userTag",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    console.log(token);
    user.token = token;
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["_id", "name", "email", "token"]));
  },

  uploadDocument: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) res.status(404).send("User Not Found");

    if (user.documentImagePath)
      await unlinkAsync("client-rento/public/" + user.documentImagePath);

    await upload(req, res);
    documentPath = req.customPath + req.files[0].filename;

    user.set({
      documentImagePath: documentPath,
    });
    await user.save();

    console.log(documentPath);
    res.send(documentPath);
  },

  login: async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if (req.body.userRole !== "Tenant" && req.body.userRole !== "RoomOwner")
    //   return res.status(400).send("Invalid Email/ Password!!");

    let user = await User.findOne({
      userRole: req.body.userRole,
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid Email/ Password!!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid Email/ Password!!");

    const token = user.generateAuthToken();
    res.send(token);
  },

  adminLogin: async (req, res) => {
    req.body.userRole = "Admin";
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
      userRole: "Admin",
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid Email/ Password1!!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid Email/ Password2!!");

    const token = user.generateAuthToken();
    res.send(token);
  },

  fetchUserData: async (req, res) => {
    const userData = await User.findOne({
      userRole: req.user.userRole,
      _id: req.user._id,
    }).select("-password");
    res.send(userData);
  },

  getTotalUser: async (req, res) => {
    const total = await User.find().countDocuments();
    res.send("" + total);
  },
  userCreatedToday: async (req, res) => {
    const data = await User.find({
      dateCreated: new Date().toISOString().slice(0, 10),
    }).countDocuments();
    res.send("" + data);
  },

  verify: async (req, res) => {
    await User.updateOne({ _id: req.body.userId }, { verified: true });
    res.send("user verified");
  },
};
