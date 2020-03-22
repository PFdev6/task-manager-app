"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      type_task: DataTypes.INTEGER,
      header: DataTypes.STRING,
      content: DataTypes.TEXT,
      group_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      parent_task_id: DataTypes.INTEGER
    },
    {}
  );
  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    Task.belongsTo(models.Group, {
      foreignKey: "group_id"
    });

    Task.hasMany(models.Notification, {
      foreignKey: "task_id",
      as: "notifications"
    });
  };
  return Task;
};

