require('dotenv').config()
const express = require('express');
const cors = require('cors');
const routes = require('./router/routes');
const { connectingDB } = require('./Config/db');
const app = express()

connectingDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 
app.use('/', routes)

module.exports = app;