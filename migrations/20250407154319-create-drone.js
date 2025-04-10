'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('active', 'maintenance', 'decommissioned'),
        allowNull: false,
      },
      battery: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      maxSpeed: {
        type: Sequelize.INTEGER,
      },
      flightTime: {
        type: Sequelize.INTEGER,
      },
      range: {
        type: Sequelize.INTEGER,
      },
      payload: {
        type: Sequelize.DECIMAL(5, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Drones');
  },
};