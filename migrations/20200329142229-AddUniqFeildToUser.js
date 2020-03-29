"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'ALTER TABLE public."Users" ADD CONSTRAINT Users_email_uq UNIQUE (email);' +
        'ALTER TABLE public."Users" ADD CONSTRAINT Users_username_uq UNIQUE (username);'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'ALTER TABLE public."Users" DROP CONSTRAINT Users_email_uq;' +
        'ALTER TABLE public."Users" DROP CONSTRAINT Users_username_uq;'
    );
  },
};
