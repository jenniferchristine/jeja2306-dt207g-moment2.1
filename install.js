const { Client } = require("pg");
require("dotenv").config();

// anslut till databas
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: { 
        rejectUnauthorized: false, // ej tillgång till krypt info
    },
});

client.connect((err) => {
    if (err) {
        console.log("Could not connect to database " + err);
    } else {
        console.log("Connected to database");
    }
});