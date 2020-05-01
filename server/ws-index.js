const schedule = require("node-schedule");
const db = require("../models");
const Sequelize = require("sequelize");

module.exports = sockets => {
  sockets.on("connection", () => {
    console.info("--- User Connected ---");
  });

  sockets.on("disconnect", () => {
    console.info("--- User Disconnected ---");
  });

  const sendNote = (userId, data) => {
    sockets.emit(userId, data);
  };

  schedule.scheduleJob("*/1 * * * *", () => {
    console.log("-------------Notifiction Job----------------");

    db.Notification.findAll({
      where: Sequelize.literal(
        '"Notification"."createdAt" >= (NOW() - INTERVAL \'1 MINUTES\')'
      )
    }).then(notes => {
      notes.forEach(note => {
        if (note.user_id !== null) {
          sendNote(note.user_id, note);
        }
        if (note.group_id !== null) {
          db.User.findAll({
            where: {
              group_id: note.group_id
            }
          }).then(users => {
            users.forEach(user => sendNote(user.id, note));
          });
        }
      });
    });
  });
};
