const { Client } = require("pg");
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

/* MIDDLEWARES */

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


// hämta api 
app.get("/cv", (req, res) => {
    res.json({ message: "API for job experiences" })
});

// hämta innehåll
app.get("/cv/workexperience", async (req, res) => {
    client.query(`SELECT * FROM workexperience ORDER BY id DESC;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Failed to select " + err });
            return;
        }
        if (results.rows.length === 0) {
            res.status(200).json({ message: "No results found" });
        } else {
            res.status(200).json(results.rows);
        }
    })
});

// hämta specifierat innehåll
app.get("/cv/workexperience/:id", async (req, res) => {
    const id = req.params.id;

    const selectExperience = { // sql-förfrågan med angivet id
        text: 'SELECT * FROM workexperience WHERE id = $1',
        values: [id],
    };

    const result = await client.query(selectExperience, (err, results) => { // utför förfrågan
        if (err) {
            res.status(500).json({error: "Failed to select " + err});
            return;
        }
        if (results.rows.length === 0) {
            res.status(200).json({message: "No results found"});
        } else {
            res.status(200).json(results.rows[0]); // returnera endast första resultatet, om de finns
        }
    });
});

app.post("/cv/workexperience", async (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let description = req.body.description;

    let errors = { // felhantering
        message: "",
        detail: "",
        https_response: {

        }
    };

    if (!companyname || !jobtitle || !location || !description) {

        // error-meddelanden
        errors.message = "You must add where you have been employed, by whom, as what and add a description of the work";
        errors.detail = "All information needs to be added in JSON";

        // svarsmeddelanden
        errors.https_response.message = "Bad request";
        errors.https_response.code = 400;

        res.status(400).json(errors);
        return;
    }

    // addera jobberfarenhet
    const result = await client.query(`INSERT INTO workexperience(companyname, jobtitle, location, description) VALUES ($1, $2, $3, $4);`,
        [companyname, jobtitle, location, description], (err, results) => {
            if (err) {
                res.status(500).json({ error: "Failed to select " + err }); // serverfel 500
                return;
            }
            console.log("Fråga skapad: " + results);
        });

    let workexperience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        description: description
    };

    res.json({ message: "Workexperience added", workexperience });
});

// uppdatera
app.put("/cv/workexperience/:id", async (req, res) => {
    const id = req.params.id; // id från url
    const updated = req.body; // hämta uppdaterad

    try { 
        const result = await client.query(`UPDATE workexperience SET companyname = $1, jobtitle = $2, location = $3, description = $4 WHERE id = $5`,
            [updated.companyname, updated.jobtitle, updated.location, updated.description, id] // funktion för att kommunicera med databas och query för förfrågan
        );
        res.json({ message: "Workexperience updated: " + req.params.id });
    } catch (err) {
        console.log("Error while updating workexperience: " + err);
        res.status(500).json({ error: "An error occurred while updating workexperience" });
    }
});

// radera
app.delete("/cv/workexperience/:id", (req, res) => {
    const id = req.params.id;
    
    const deleteExperience = { // sql-förfrågan för att radera med angivet id
      text: 'DELETE FROM workexperience WHERE id = $1',
      values: [id],
    };
  
    client.query(deleteExperience, (err, results) => {
      if (err) {
        console.error('Error when deleting', err);
        res.status(500).json({ message: 'Error deleting work experience' + err});
      } else {
        res.json({ message: 'Work experience deleted successfully: ' + id });
      }
    });
  });

// starta server
app.listen(port, () => {
    console.log("Server started on port: " + port);
});