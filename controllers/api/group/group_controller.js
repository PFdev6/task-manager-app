const db = require("../../../models");
const mailer = require("../../../services/mailer");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const Sequelize = require("sequelize");

const createGroup = (req, res) => {
  console.log(req.body);
  let params = req.body.params;

  db.Group.create(params)
    .then(async group => {
      console.log("new Group!!!");
      console.log(group);
      if (group.id) {
        await db.User.update(
          { group_id: group.id },
          { where: { id: params.admin_id } }
        );
      }
      return group;
    })
    .then(task => res.status(200).send(task))
    .catch(error => res.status(400).send(error));
};

module.exports.create = createGroup;

const getGroupUsers = (req, res) => {
  console.log(req.params);
  const { groupId } = req.params;

  db.User.findAll({ where: { group_id: groupId } }).then(users => {
    res.status.send(users);
  });
};

module.exports.getUsers = getGroupUsers;

const kickUser = (req, res) => {};

module.exports.kick = kickUser;

const inviteUser = (req, res) => {};

module.exports.invite = inviteUser;
