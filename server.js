const { Client } = require("pg");
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true })); // tolka http post
app.use(express.json()); // tolka jsondata
app.use(cors()); // hantera cors för alla rutter

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

app.listen(process.env.PORT, () => { // starta server
    console.log("Server started on port: " + process.env.PORT);
});