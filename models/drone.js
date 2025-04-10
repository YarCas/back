module.exports = (sequelize, DataTypes) => {
  const Drone = sequelize.define('Drone', {
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'maintenance', 'decommissioned'),
      allowNull: false,
    },
    battery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    image_url: {
      type: DataTypes.STRING(255),
    },
    max_speed: {
      type: DataTypes.INTEGER,
    },
    flight_time: {
      type: DataTypes.INTEGER,
    },
    range: {
      type: DataTypes.INTEGER,
    },
    payload: {
      type: DataTypes.DECIMAL(5, 2),
    },
  }, {
    tableName: 'drones',
    timestamps: false, // Отключаем временные метки
  });

  return Drone;
};
