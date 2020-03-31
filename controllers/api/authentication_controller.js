const db = require("../../models");
const mailer = require("../../services/mailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports.signUp = (req, res) => {
  console.log(req.body);
  let { email, username, password } = req.body;
  password = bcrypt.hashSync(password, saltRounds);
  db.User.create({ email, username, password })
    .then((user) => {
      mailer.confirmationUser(user.email);
      res.status(201).send(user);
    })
    .catch((error) => res.status(400).send(error));
};

module.exports.login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  db.User.findOne({ where: { email: email } }).then((user) => {
    if (user === null) {
      res.status(404).send({ messages: ["User is not found"] });
    }
    console.log(password);
    bcrypt.compare(password, user.password, (err, isMatch) => {
      console.log(isMatch);
      if (isMatch && user.confirmation_date) {
        res.status(200).send({ id: user.id, email: user.email });
      } else if (user.confirmation_date === null) {
        res.status(400).send({ messages: ["Need to confirm email"] });
      } else {
        res.status(400).send({ messages: ["Email or password are incorrect"] });
      }
    });
  });
};

module.exports.confirmUser = (req, res) => {
  const token = req.query.token;
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const email = decoded.email;
  console.log(email);
  if (!email) {
    res.send("<h1> Failure </h1>");
  }

  db.User.findOne({ where: { email: email } }).then((user) => {
    if (user.confirmation_date) {
      res.send("<h1> Confirmed </h1>");
    } else {
      db.User.update(
        { confirmation_date: Date.now() },
        { where: { email: email, confirmation_date: null } }
      )
        .then((result) => {
          res
            .status(301)
            .redirect(`http://${process.env.HOST}:${process.env.PORT}`);
        })
        .error((err) => {
          res.send("<h1> Confirmed </h1>");
        });
    }
  });
};
