const dbPromis = require('../lib/db.js');

const BookingDetails = {

    createTableBooking: async () => {
        try {
            const db = await dbPromis;
            await db.query(`
                    CREATE TABLE IF NOT EXISTS users(
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                `);
            console.log("cab bookingDetails Table created successfully.");
        } catch (error) {
            console.error("Failed to create cab bookingDetails table:", error.message);
        }
    },
}