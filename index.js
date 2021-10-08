require("dotenv").config();

const express = require('express');

const connectDB = require('./config/db');

const app = express();

app.use(express.static("views"));

// Connect to DB 
connectDB;

app.use(express.json({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// Initialise Routes
app.use('/', require('./routes/urlpath'));

app.use('/api/', require('./routes/endpoints'));

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => console.log('Server is running on port', PORT));