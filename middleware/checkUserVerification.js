const { User } = require("../models/user");

module.exports = async (req, res, next) => {
  console.log(req);
  const user = await User.findOne({ _id: req.user._id });
  if (!user) res.status(404).send("User Not Found");

  if (!user.isEmailActivated)
    res.status(400).send("Please Activate Email First");

  if (!user.verified) res.status(400).send("Please verify Identity First");
  next();
};
