const db = require("../../../models");
const mailer = require("../../../services/mailer");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");
const Sequelize = require("sequelize");

const getNotifications = (req, res) => {
  console.log(req.params);
  const whereCondition = req.params;

  if (whereCondition) {
    db.Task.findAll({
      where: whereCondition,
      include: [
        { model: db.User, as: "user" },
        { model: db.Task, as: "task" }
      ]
    }).then(tasks => {
      res.status(200).send(tasks);
    });
  }
};

module.exports.get = getNotifications;
