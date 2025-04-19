const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports.sendRentoMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return error;
  }
};

module.exports.activationMailOption = (userId, email) => {
  const token = jwt.sign({ _id: userId, email: email }, "rentoSecretKey", {
    expiresIn: "1d",
  });
  const url = `${process.env.CLIENT_URL}/activation/${token}`;
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
  const url = `${process.env.CLIENT_URL}/forgotPassword/${token}`;
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
