const { User, validateRegister, validateLogin } = require("../models/user");
const upload = require("../middleware/upload");
const {
  sendRentoMail,
  activationMailOption,
  forgotPasswordMailOption,
} = require("../middleware/mail");
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

    phone = req.body.phone.replace(/ /g, "");

    if (phone.length !== 10)
      return res.status(400).send("Enter Valid Phone Number !!");

    let checkPhone = await User.findOne({ phone: phone });
    if (checkPhone) return res.status(400).send("Phone Already in Use !!");

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
    sendRentoMail(mailOptions);

    const token = user.generateAuthToken();

    const uv_token = jwt.sign(
      {
        _id: user._id,
        isEmailActivated: user.isEmailActivated,
        verified: user.verified,
      },
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

      console.log(decodedUser);

      const token = req.header("x-auth-token");
      if (token) {
        const currentUser = jwt.verify(token, "rentoUserSecretKey");
        if (currentUser) {
          if (currentUser._id.toString() !== decodedUser._id.toString()) {
            return res.status(400).send("Invalid Token");
          }
        }
      }

      let user = await User.findOne({ email: decodedUser.email });
      user.isEmailActivated = true;
      await user.save();

      res.send(`${decodedUser.email} Email is Activated`);
    } catch (ex) {
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
      declined: false,
      documentImagePath: documentPath,
    });
    await user.save();

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

    if (user.passwordResetCode) {
      user.passwordResetCode = "";
      user.save();
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid Email/ Password!!");

    const token = user.generateAuthToken();

    const uv_token = jwt.sign(
      {
        _id: user._id,
        isEmailActivated: user.isEmailActivated,
        verified: user.verified,
        declined: user.declined,
      },
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
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { verified: true }
    );
    res.send(`User ${user.name} was verified`);
  },
  decline: async (req, res) => {
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { declined: true }
    );
    res.send(`User ${user.name}'s verification was declined`);
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
    const email = req.body.email.toLowerCase();

    const user = await User.findOne({ _id: req.body.id });

    phone = req.body.phone.replace(/ /g, "");

    if (phone.length !== 10)
      return res.status(400).send("Enter Valid Phone Number !!");

    let checkPhone = await User.findOne({ phone: phone });
    if (checkPhone && checkPhone._id.toString() !== user._id.toString())
      return res.status(400).send("Phone Already in Use !!");

    let emailCheck = await User.findOne({ email: email });

    if (emailCheck && emailCheck._id.toString() !== user._id.toString())
      return res.status(400).send("Email already in Use !!");

    if (user.email !== email) user.isEmailActivated = false;

    user.set({
      name: req.body.name,
      email: email,
      phone: req.body.phone,
    });
    user.save();

    const mailOptions = activationMailOption(user._id, email);
    sendRentoMail(mailOptions);
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
      {
        _id: user._id,
        isEmailActivated: user.isEmailActivated,
        verified: user.verified,
        declined: user.declined,
      },
      "rentoUserSecretKey",
      {
        expiresIn: "1d",
      }
    );

    const decoded = jwt.verify(token, "rentoUserSecretKey");

    res.send(token);
  },

  mailResend: async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status.status(404).send("user not found");

    if (user.isEmailActivated) return res.send("Email Already verified");

    const mailOptions = activationMailOption(user._id, user.email);
    sendRentoMail(mailOptions);

    res.send("mail send Successfully");
  },

  forgotPasswordEmail: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("Email doesn't Exist");

    if (user.userRole === "Admin")
      return res.status(404).send("Email doesn't Exist");

    const secretCode = Math.floor(100000 + Math.random() * 900000);

    user.set({ passwordResetCode: secretCode });
    user.save();

    const mailOptions = forgotPasswordMailOption(
      user._id,
      user.email,
      secretCode
    );

    sendRentoMail(mailOptions);

    res.send("mail send Successfully");
  },

  changePasswordTokenCheck: async (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).send("Access Denied Token Required!!");

    try {
      const decodedData = jwt.verify(token, "rentoSecretKey");
      if (!decodedData) return res.status(400).send("something went wrong");

      let user = await User.findOne({
        _id: decodedData._id,
        email: decodedData.email,
        passwordResetCode: decodedData.secretCode,
      });
      if (!user) return res.status(400).send("Invalid Token");

      res.send("Token Validated");
    } catch (ex) {
      res.status(400).send("Invalid Token");
    }
  },
  changePasswordByToken: async (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).send("Access Denied Token Required!!");

    try {
      const decodedData = jwt.verify(token, "rentoSecretKey");
      if (!decodedData) return res.status(400).send("something went wrong");

      let user = await User.findOne({
        _id: decodedData._id,
        email: decodedData.email,
        passwordResetCode: decodedData.secretCode,
      });
      if (!user) return res.status(400).send("Invalid Token");

      if (req.body.password1 !== req.body.password2)
        return res.status(402).send("Passwords Doesnot Match");

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password1, salt);

      user.set({
        password: password,
        passwordResetCode: "",
      });
      await user.save();

      res.send(true);
    } catch (ex) {
      res.status(400).send("Invalid Token");
    }
  },
  getVerifyUser: async (req, res) => {
    const value = await User.find({ verified: false })
      .and({ documentImagePath: { $exists: true } })
      .and({ declined: false });
    res.send(value);
  },
  getUserById: async (req, res) => {
    const userData = await User.findById(req.params.id).select("-password");
    res.send(userData);
  },
};
