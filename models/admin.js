const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const adminSchema = new mongoose.Schema({
  adminTag: {
    type: String,
  },
  name: {
    type: String,
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
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Staff", "User"],
    default: "User",
  },
});

adminSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, "rentoUserSecretKey");
};

const Admin = mongoose.model("Admin", adminSchema);

function validateRegister(admin) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(admin);
}

function validateLogin(admin) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(admin);
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.Admin = Admin;
