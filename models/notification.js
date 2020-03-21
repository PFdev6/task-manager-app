"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      message: DataTypes.STRING,
      time: DataTypes.DATE,
      task_id: DataTypes.INTEGER
    },
    {}
  );
  Notification.associate = function(models) {
    Notification.belongsTo(models.Task, {
      foreignKey: "task_id"
    });
  };
  return Notification;
};

