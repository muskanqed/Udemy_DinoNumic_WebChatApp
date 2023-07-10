'use strict';
const bcrypt = require ("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Harry",
        lastName: "Doe",
        email: "harry@gmail.com",
        password: bcrypt.hashSync('secure',10),
        gender: "male",
      },
      {
        firstName: "Rajat",
        lastName: "Hongal",
        email: "rajat@gmail.com",
        password: bcrypt.hashSync('secure',10),
        gender: "male",
      },
      {
        firstName: "Jane",
        lastName: "Kuno",
        email: "jane@gmail.com",
        password: bcrypt.hashSync('secure',10),
        gender: "female",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
