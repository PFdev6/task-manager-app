require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const SIGNUP_SUBJECT = "Task Manager SignUp";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PSSWRD,
  },
});

const signUpText = (email) => {
  token = jwt.sign({ email: email }, process.env.JWT_PRIVATE_KEY);
  return `<p> Confirm user --> Click <a href='${process.env.HOST}:${process.env.PORT}/api/confirmUser?token=${token}'>here</a> to confirm account </p>`;
};

module.exports.confirmationUser = (email) => {
  const message = {
    from: 'manager@task.com',
    to: email,
    subject: SIGNUP_SUBJECT,
    text: 'Sign Up',
    html: signUpText(email),
  };
  console.log(process.env.MAIL_USER);
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error');
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
