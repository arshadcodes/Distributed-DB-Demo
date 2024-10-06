import mysql from 'mysql2/promise';
require('dotenv').config();

let indiaDb;
let europeDb;

(async () => {
    try {
        // Connect to the first database
        indiaDb = await mysql.createConnection({
            host: process.env.DB_IN_HOST,
            user: process.env.DB_IN_USER,
            password: process.env.DB_IN_PASSWORD,
            database: process.env.DB_IN_NAME
        });

        // Connect to the second database
        europeDb = await mysql.createConnection({
            host: process.env.DB_EU_HOST,
            user: process.env.DB_EU_USER,
            password: process.env.DB_EU_PASSWORD,
            database: process.env.DB_EU_NAME
        });

        console.log('Connected to both databases successfully');
    } catch (err) {
        console.error('Error connecting to the databases:', err);
    }
})();

export { indiaDb, europeDb };