"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      message: DataTypes.STRING,
      time: DataTypes.DATE,
      type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      task_id: DataTypes.INTEGER
    },
    {}
  );
  Notification.associate = function(models) {
    Notification.belongsTo(models.Task, {
      foreignKey: "task_id",
      as: "task"
    });

    Notification.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
  };

  return Notification;
};
