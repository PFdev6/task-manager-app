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
          console.log(`Sending note to user --> id: ${note.user_id}`);
          sendNote(note.user_id, note);
        }
      });
    });
  });
};
