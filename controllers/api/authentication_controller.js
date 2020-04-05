const db = require("../../models");
const mailer = require("../../services/mailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const passport = require("passport");

const signUpV1 = (req, res) => {
  console.log(req.body);
  let { email, username, password } = req.body;
  password = bcrypt.hashSync(password, saltRounds);
  db.User.create({ email, username, password })
    .then(user => {
      mailer.confirmationUser(user.email);
      res.status(201).send(user);
    })
    .catch(error => res.status(400).send(error));
};

const loginV1 = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  db.User.findOne({ where: { email: email } }).then(user => {
    if (user === null) {
      res.status(404).send({ messages: ["User is not found"] });
    }
    console.log(password);
    bcrypt.compare(password, user.password, (err, isMatch) => {
      console.log(isMatch);
      if (isMatch && user.confirmation_date) {
        req.session.log = true;
        res.status(200).send({ id: user.id, email: user.email });
      } else if (user.confirmation_date === null) {
        res.status(400).send({ messages: ["Need to confirm email"] });
      } else {
        res.status(400).send({ messages: ["Email or password are incorrect"] });
      }
    });
  });
};

const loginV2 = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      console.log(err);
      if (err !== null) {
        console.log("500 error login <--------------------");
        const error = new Error("An Error occurred");
        return next(error);
      }
      if (user === false) return res.json(info);
      req.login(user, { session: false }, error => {
        if (error) return next(error);
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_PRIVATE_KEY);
        return res.json(Object.assign(body, { token: token }));
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports.login = loginV2;
module.exports.signUp = signUpV1;
module.exports.logout = (req, res) => {};

module.exports.confirmUser = (req, res) => {
  const token = req.query.token;
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const email = decoded.email;
  console.log(email);
  if (!email) {
    res.send("<h1> Failure </h1>");
  }

  db.User.findOne({ where: { email: email } }).then(user => {
    if (user.confirmation_date) {
      res.send("<h1> Confirmed </h1>");
    } else {
      db.User.update(
        { confirmation_date: Date.now() },
        { where: { email: email, confirmation_date: null } }
      )
        .then(result => {
          res
            .status(301)
            .redirect(`http://${process.env.HOST}:${process.env.PORT}`);
        })
        .error(err => {
          res.send("<h1> Confirmed </h1>");
        });
    }
  });
};
