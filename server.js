'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

const client = require('./client.js'); 

client.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`My server is up and running on ${PORT}`);
    }).catch(err => {
        throw new Error(`Startup Error: ${err}`);
    })
});

app.get('/', (request, response) => {
    response.send('The Home Page..');
});

const locationHandler = require('./jsFiles/location.js');
const weatherHandler = require('./jsFiles/weather.js');
const handler = require('./handler.js');

app.get('/weather', weatherHandler);

app.get('/location', locationHandler);
app.use('*', handler.notFoundHandler);
app.use(handler.errorHandler);