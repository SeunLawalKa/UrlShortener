require("dotenv").config();

const express = require('express');

const connectDB = require('./config/db');

const app = express();

app.use(express.static("views"));

// Connect to DB 
connectDB;

/* const dbConfig = require("./config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}); */

app.use(express.json({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// Initialise Routes
app.use('/', require('./routes/urlpath'));

app.use('/api/', require('./routes/endpoints'));

//const PORT = 5000;

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => console.log('Server is running on port', PORT));