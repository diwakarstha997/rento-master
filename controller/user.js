const { User, validateRegister, validateLogin } = require("../models/user");
const upload = require("../middleware/upload");
const { sendRentoMail, activationMailOption } = require("../middleware/mail");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

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

    const mailOptions = activationMailOption(user._id, req.body.email);
    await sendRentoMail(mailOptions);

    const token = user.generateAuthToken();

    const uv_token = jwt.sign(
      { isEmailActivated: user.isEmailActivated, verified: user.verified },
      "rentoSecretKey",
      {
        expiresIn: "1d",
      }
    );

    user.token = token;
    user.uv_token = uv_token;
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["_id", "name", "email", "token", "uv_token"]));
  },

  activateEmail: async (req, res) => {
    const activationToken = req.params.id;
    if (!activationToken)
      return res.status(401).send("Access Denied Token Required!!");

    try {
      const decodedUser = jwt.verify(activationToken, "rentoSecretKey");
      if (!decodedUser) return res.status(400).send("something went wrong");

      let user = await User.findOne({ email: decodedUser.email });
      user.isEmailActivated = true;
      await user.save();

      res.send(`${decodedUser.email} Email is Activated`);
    } catch (ex) {
      console.log(ex);
      res.status(400).send("Invalid Token");
    }
  },

  uploadDocument: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).send("User Not Found");

    if (!user.isEmailActivated)
      return res.status(400).send("Please Activate Email First");

    if (user.verified) return res.status(400).send("User Already Verified");

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

    const uv_token = jwt.sign(
      { isEmailActivated: user.isEmailActivated, verified: user.verified },
      "rentoSecretKey",
      {
        expiresIn: "1d",
      }
    );

    const tokens = { token: token, uv_token: uv_token };
    res.send(tokens);
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

  changePassword: async (req, res) => {
    let user = await User.findOne({
      userRole: req.body.userRole,
      _id: req.body.id,
    });
    if (!user) return res.status(400).send("Invalid Email/ Password!!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).send("Incorrect Old Password");

    if (req.body.password1 === req.body.password)
      return res
        .status(400)
        .send("New Password cannot be same as old Password");

    if (req.body.password1 !== req.body.password2)
      return res.status(400).send("Passwords Doesnot Match");

    user.set({
      password: req.body.password1,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.send("Password Chaged Succesfully");
  },

  fetchUserData: async (req, res) => {
    const userData = await User.findOne({
      userRole: req.user.userRole,
      _id: req.user._id,
    }).select("-password");
    res.send(userData);
  },

  editProfileData: async (req, res) => {
    const user = await User.findOne({ _id: req.body.id });

    let emailCheck = await User.findOne({ email: req.body.email });
    // console.log(emailCheck._id, user._id);
    if (emailCheck && emailCheck._id.toString() !== user._id.toString())
      return res.status(400).send("Email already in Use !!");

    if (user.email !== req.body.email) user.isEmailActivated = false;

    user.set({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    user.save();

    const mailOptions = activationMailOption(user._id, req.body.email);
    await sendRentoMail(mailOptions);
    // const value = await User.updateOne(
    //   { _id: req.body.id },
    //   { name: req.body.name, email: req.body.email, phone: req.body.phone }
    // );
    res.send("Profile Updated");
  },

  checkUserVerification: async (req, res) => {
    const user = await User.findOne({
      userRole: req.user.userRole,
      _id: req.user._id,
    });

    if (!user) return res.status(404).send("User not found");

    const token = jwt.sign(
      { isEmailActivated: user.isEmailActivated, verified: user.verified },
      "rentoUserSecretKey",
      {
        expiresIn: "1d",
      }
    );

    const decoded = jwt.verify(token, "rentoUserSecretKey");
    console.log(decoded);

    res.send(token);
  },

  mailResend: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status.status(404).send("user not found");

    const mailOptions = activationMailOption(user._id, user.email);
    await sendRentoMail(mailOptions);

    res.send("mail send Successfully");
  },
};
