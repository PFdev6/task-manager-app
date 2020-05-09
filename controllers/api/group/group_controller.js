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
    .then(group => res.status(200).send(group))
    .catch(error => res.status(400).send(error));
};

module.exports.create = createGroup;

const getGroupUsers = (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  db.User.findAll({ where: { group_id: id } }).then(users => {
    res.status(200).send(users);
  });
};

module.exports.getUsers = getGroupUsers;

const kickUser = async (req, res) => {
  const { id, user_id } = req.params;
  await db.Notification.create({
    user_id: user_id,
    type: "kick",
    message: `You were kicked from group ${id}`
  });
  db.User.update({ group_id: null }, { where: { id: user_id } }).then(
    updateInfo => {
      if (updateInfo === 1) {
        res.status(200).send({ message: "Complete" });
      } else {
        res.status(400).send({ message: "Oops" });
      }
    }
  );
};

module.exports.kick = kickUser;

const inviteUser = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;
  const { email } = req.body;
  const user = await db.User.findOne({ where: { email: email } });
  console.log(user);
  if (user !== null) {
    token = jwt.sign(
      { group_id: id, email: email },
      process.env.JWT_PRIVATE_KEY
    );
    db.Notification.create({
      user_id: user.id,
      type: "invite",
      message: token
    }).then(notif => {
      res.status(200).send({ notification: notif });
    });
  } else {
    res.status(400).send({ message: "User not found" });
  }
};

module.exports.invite = inviteUser;

const confirmInviteToGroup = (req, res) => {
  console.log(req.body);
  const { token, id } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  const { group_id, email } = decoded;
  db.User.update({ group_id: group_id }, { where: { email: email } }).then(
    async updateInfo => {
      console.log("------------Update Group Id----------------");
      console.log(updateInfo[0]);
      await db.Notification.destroy({ where: { id: id } });
      if (updateInfo[0] === 1) {
        db.Group.findOne({where: {id: group_id}}).then((group) => {
          res.status(200).send(group);
        })
      } else {
        res.status(400).send({ message: "Oops" });
      }
    }
  );
};

module.exports.confirmInvite = confirmInviteToGroup;

const deleteGroup = async (req, res) => {
  const { id } = req.params;
  await db.User.update({ group_id: null }, { where: { group_id: id } });
  db.Group.destroy({ where: { id: id } }).then(numDeletedGroup => {
    res.status(200).send({ message: "Deleted" });
  });
};

module.exports.delete = deleteGroup;
