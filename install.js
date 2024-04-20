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
    DROP TABLE IF EXISTS cv;
    CREATE TABLE cv(
    id SERIAL PRIMARY KEY NOT NULL,
    companyname VARCHAR(255) NOT NULL,
    jobtitle VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    startdate DATE,
    enddate DATE)`, (err, results) => { // vid error
        if (err) {
            console.log("Error: Could not create table " + err);
            return;
        }
        console.log("Table created " + results);
    });

// lägg till data
client.query(`
INSERT INTO cv(companyname, jobtitle, location, description, startdate, enddate)
VALUES 
('SEB', 'Bolånehandläggare', 'Sundsvall', 'Förhandlat bolåneräntor och uppläggning av lån', '2021-10-15', '2023-12-31'),
('Videoteket', 'Marknadsförare', 'Sundsvall', 'Skötte all digital och fysisk marknadsföring, grafiskt material och reklam', '2018-06-01', '2019-12-01'),
('Frilansare', 'Logodesigner', 'Sundsvall', 'Designat personliga logotyper', '2017-01-01', '2022-01-01')
`, 
(err, results) => {
if (err) {
    console.error('Error inserting data into cv table: ', err);
    return;
}
console.log('Data inserted successfully ' + results);
});