const dbPromis = require('../lib/db.js');

const userModule = {

    createTableUsers: async () => {
        try {
            const db = await dbPromis;
            await db.query(`
                CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(250) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                city VARCHAR(255),
                role VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
            console.log("User Table created successfully.");
        } catch (error) {
            console.error("Failed to create User table:", error.message);
        }
    },

    createUser: async ({ fullName, email, password,city,role }) => {
        try {
            const db = await dbPromis;
            const [result] = await db.query(`INSERT INTO users (fullName, email, password, city,role) VALUES (?, ?, ?, ?, ?)`,[fullName,email,password,city,role]);
            return result.insertId;
        } catch (error) {
            console.error("Failed to create new User:", error.message);
        }
    },

    getUserByEmail : async (email) => {
        try {
            const db = await dbPromis;
            const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [email])
            return result[0];
        } catch (error) {
            console.error("Failed to get user By email:", error.message);
        }
    },

    getUserById: async (id) => {
        try {
            const db = await dbPromis;
            const [result] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
            return result[0];
        } catch (error) {
            console.error("Failed to get user By Id:", error.message);
        }
    },
}

module.exports = userModule;