const express = require('express');
const router = express.Router();
const { Drone } = require('../models');

// Роут для получения всех дронов
router.get('/drones', async (req, res) => {
    try {
        const drones = await Drone.findAll();
        const formattedDrones = drones.map(drone => ({
            id: drone.id,
            model: drone.model,
            status: drone.status === 'active' ? 'Активен' :
                drone.status === 'maintenance' ? 'В ремонте' :
                    drone.status === 'decommissioned' ? 'Выведен' : 'Неизвестный статус',
            battery: drone.battery,
            image: drone.image_url || 'api/assets/placeholder-drone.jpg',
            specs: {
                maxSpeed: drone.max_speed,
                flightTime: drone.flight_time,
                range: drone.range,
                payload: parseFloat(drone.payload),
            },
            missionStats: [], // Удалили логику с миссиями
        }));
        console.log('Formatted Drones:', formattedDrones); // Логируем преобразованные данные
        res.json(formattedDrones);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ error: 'Не удалось получить данные' });
    }
});

// Роут для получения одного дрона по ID
router.get('/drones/:id', async (req, res) => {
    try {
        const drone = await Drone.findByPk(req.params.id);
        if (drone) {
            res.json(drone);
        } else {
            res.status(404).json({ error: 'Дрон с таким ID не найден' });
        }
    } catch (error) {
        console.error('Ошибка при получении дрона:', error);
        res.status(500).json({ error: 'Не удалось получить данные дрона' });
    }
});



/// Маршрут для удаления дрона по ID
router.delete('/drones/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRows = await Drone.destroy({ where: { id } });
        if (deletedRows > 0) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Дрон с таким ID не найден' });
        }
    } catch (error) {
        console.error('Ошибка при удалении дрона:', error);
        res.status(500).json({ error: 'Не удалось удалить дрона' });
    }
});

// Добавьте этот код в droneRoutes.js
router.post('/drones', async (req, res) => {
    try {
        const newDrone = await Drone.create(req.body);
        res.status(201).json(newDrone);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка создания дрона' });
    }
});
module.exports = router;