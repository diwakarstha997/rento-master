const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, // true for 465 port and false for other
  auth: {
    user: "diwakarshrestha2015@gmail.com",
    pass: "D9818561977r",
  },
});

module.exports.sendRentoMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

module.exports.activationMailOption = (userId, email) => {
  const token = jwt.sign({ _id: userId, email: email }, "rentoSecretKey", {
    expiresIn: "1d",
  });
  const url = `http://localhost:3000/activation/${token}`;
  return (mailOptions = {
    from: "Rento no-reply@gmail.com",
    to: email,
    subject: "Email Confirmation",
    html: `<center>
                    <strong><h1>Welcome To Rento</h1></strong>
                    <h3>Click Link Below To Confirm Your Email</h3>
                    <a href="${url}"><p>${url}</p></a>
                </center>`,
  });
};

module.exports.forgotPasswordMailOption = (userId, email, secretCode) => {
  const token = jwt.sign(
    { _id: userId, email: email, secretCode: secretCode },
    "rentoSecretKey",
    {
      expiresIn: "1d",
    }
  );
  const url = `http://localhost:3000/forgotPassword/${token}`;
  return (mailOptions = {
    from: "Rento no-reply@gmail.com",
    to: email,
    subject: "Forgot Password",
    html: `<center>
                    <strong><h1>You Requested for Password Change</h1></strong>
                    <h3>Click Link Below To Change Password</h3>
                    <a href="${url}"><p>${url}</p></a>
                </center>`,
  });
};
