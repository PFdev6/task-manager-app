"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: DataTypes.STRING,
      admin_id: DataTypes.INTEGER
    },
    {}
  );
  Group.associate = function(models) {
    Group.hasMany(models.User, {
      foreignKey: "group_id",
      as: "users"
    });

    Group.hasMany(models.Task, {
      foreignKey: "group_id",
      as: "users"
    });

    Group.hasOne(models.User, {
      foreignKey: "admin_id",
      as: "admin"
    });
  };
  return Group;
};

