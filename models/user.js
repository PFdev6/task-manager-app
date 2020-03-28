"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      group_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmation_date: DataTypes.DATE
    },
    {}
  );
  User.associate = function(models) {
    User.belongsTo(models.Group, {
      foreignKey: "group_id"
    });


    User.hasOne(models.Group, {
      foreignKey: "admin_id",
      as: "admin"
    });
  };
  return User;
};

