'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Mission = sequelize.define('Mission', {
    droneId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Drones',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('planned', 'active', 'completed', 'cancelled'),
      allowNull: false,
    },
  });

  Mission.associate = (models) => {
    Mission.belongsTo(models.Drone, { foreignKey: 'droneId' });
    Mission.belongsTo(models.User, { foreignKey: 'userId' });
    Mission.belongsTo(models.Client, { foreignKey: 'clientId' });
  };

  return Mission;
};