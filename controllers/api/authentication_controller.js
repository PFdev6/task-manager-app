const db = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.signUp = (req, res) => {
  console.log(req.body);
  const { email, name, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  db.User.create({ email, name, hashedPassword })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
};
