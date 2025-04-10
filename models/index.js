'use strict';

// backend/models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config(); // Загрузка переменных окружения из .env

// Используем переменные окружения для подключения к базе данных
const sequelize = new Sequelize(
    process.env.DB_NAME,        // Имя базы данных
    process.env.DB_USER,        // Имя пользователя
    process.env.DB_PASSWORD,    // Пароль
    {
        host: process.env.DB_HOST, // Хост базы данных
        port: process.env.DB_PORT, // Порт базы данных
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, // Требуется SSL для облачных баз данных
                rejectUnauthorized: false, // Если у вас самоподписанный сертификат
            },
        },
    }
);

const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;