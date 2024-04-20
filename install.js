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

// skapa och ersätt tabell
client.query(` 
    DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience(
    id SERIAL PRIMARY KEY NOT NULL,
    companyname VARCHAR(255) NOT NULL,
    jobtitle VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT)`, (err, results) => { // vid error
        if (err) {
            console.log("Error: Could not create table " + err);
            return;
        }
        console.log("Table created " + results);
    });

// lägg till data
client.query(`
INSERT INTO workexperience(companyname, jobtitle, location, description)
VALUES 
('SEB', 'Bolånehandläggare', 'Sundsvall', 'Förhandlat bolåneräntor och uppläggning av lån'),
('Videoteket', 'Marknadsförare', 'Sundsvall', 'Skötte all digital och fysisk marknadsföring, grafiskt material och reklam'),
('Frilansare', 'Logodesigner', 'Sundsvall', 'Designat personliga logotyper')
`, 
(err, results) => {
if (err) {
    console.error('Error inserting data into table: ', err);
    return;
}
console.log('Data inserted successfully ' + results);
});