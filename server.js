// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const droneRoutes = require('./routes/droneRoutes'); // Импортируем роуты
//
// const app = express();
//
// // Middleware
// app.use(cors());
// app.use(express.json());
//
// // Подключаем роуты
// app.use('/api/drones', droneRoutes);
//
// // Запуск сервера
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Сервер запущен на порту ${PORT}`);
// });

// backend/server.js
// backend/server.js
require('dotenv').config(); // Добавьте в начале файла
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const {join} = require("node:path");
const droneRoutes = require('./routes/droneRoutes');

// // Импортируем модели
// const sequelize = new Sequelize('react-drone', 'postgres', 'y0601ar', {
//     host: 'localhost',
//     dialect: 'postgres',
// });

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Если у вас самоподписанный сертификат
        }
}}
);

// Проверка подключения к базе данных
sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных успешно установлено.');
    })
    .catch((err) => {
        console.error('Не удалось подключиться к базе данных:', err);
    });

// Создание Express-приложения
const app = express();

// Middleware
const allowedOrigins = [process.env.CORS_ORIGIN || 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Недопустимый источник'))
        }
    },
    credentials: true
}));
app.use(express.json());
// Настройка статического каталога
// backend/server.js
const path = require('path');

// Проксирование статических файлов
// Настройка статического каталога
app.use(process.env.ASSETS_PATH, express.static(path.join(__dirname, 'public/assets')));

app.use('/api', droneRoutes);

// Middleware
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});



// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});