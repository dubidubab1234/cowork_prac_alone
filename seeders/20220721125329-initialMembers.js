"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Members", [
      {
        id: 1,
        name: "John Doe",
        team: "Server Developer",
        phoneNumber: "010-2222-2222",
      },
      {
        id: 2,
        name: "Yollo Doe",
        team: "Ios Developer",
        phoneNumber: "010-1111-1111",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Members", null, {});
  },
};
