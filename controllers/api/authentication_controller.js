const db = require("../../models");
const mailer = require("../../services/mailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports.signUp = (req, res) => {
  console.log(req.body);
  const { email, name, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  db.User.create({ email, name, hashedPassword })
    .then((user) => {
      mailer.confirmationUser(user.email);
      res.status(201).send(user);
    })
    .catch((error) => res.status(400).send(error));
};

module.exports.confirmUser = (req, res) => {
  const token = req.query.token;
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const email = decoded.email;
  if (!email) {
    res.send("<h1> Failure </h1>");
  }

  db.User.findOne({ where: { email: email } }).then((user) => {
    if (user.confirmation_date) {
      res.send("<h1> Confirmed </h1>");
    } else {
      db.User.updateAttributes({
        confirmation_date: Date.now(),
      });
      res.redirect(`${process.env.HOST}:${process.env.PORT}`);
    }
  });
};
