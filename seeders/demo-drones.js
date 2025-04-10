// backend/seeders/2025...-demo-drones.js
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Drones', [
            {
                model: "DJI Mavic 3",
                status: "active",
                battery: 85,
                imageUrl: "/assets/drone1.jpg",
                maxSpeed: 73,
                flightTime: 46,
                range: 15,
                payload: 0.5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                model: "Autel EVO II Pro",
                status: "maintenance",
                battery: 45,
                imageUrl: "/assets/drone2.jpg",
                maxSpeed: 72,
                flightTime: 40,
                range: 9,
                payload: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Drones', null, {});
    },
};