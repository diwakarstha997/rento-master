const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  userTag: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  phone: { type: String, required: true, minlength: 10, maxlength: 10 },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Staff", "User"],
    default: "User",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString().slice(0, 10),
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, "rentoUserSecretKey");
};

const User = mongoose.model("User", userSchema);

function validateRegister(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(10).max(10).required(),
  });
  return schema.validate(user);
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.User = User;
