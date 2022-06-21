const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Create a new express application instance
const app = express();

//DB Connection
dbConnection();

//Cors
app.use(cors())

// Public
app.use(express.static('public'));

// Read and parse the request body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));


// The port the express app will listen on
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));