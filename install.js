const { Client } = require("pg");
require("dotenv").config();

const client = new Client({ // åtkomst för anslut
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: { 
        rejectUnauthorized: false, // ej tillgång till krypt info
    },
});

client.connect((err) => { // anslutning
    if (err) {
        console.log("Could not connect to database " + err);
    } else {
        console.log("Connected to database");
    }
});

client.query(`
    CREATE TABLE cv(
    id SERIAL PRIMARY KEY,
    companyname VARCHAR(255) NOT NULL,
    jobtitle VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    decription TEXT,
    startdate DATE,
    enddate DATE)`, (err, results) => {
        if (err) {
            console.log("Error: Could not create table " + err);
            return;
        }
        console.log("Table created " + results);
    });