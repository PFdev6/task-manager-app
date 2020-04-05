"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      group_id: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      confirmation_date: DataTypes.DATE
    },
    {
      instanceMethods: {
        verifyPassword: password => {
          return bcrypt.compareSync(password, this.password);
        }
      }
    }
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
