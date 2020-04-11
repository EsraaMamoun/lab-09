'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

const client = require('./client.js');
const handler = require('./handler.js');

client.connect().then(() => {
    app.listen(PORT, () =>
        console.log(`My server is up and running on ${PORT}`)
        );
    })
    .catch(err => {
    throw new Error(`Startup Error: ${err}`);
})

app.get('/', (request, response) => {
    response.send('The Home Page..');
});

const locationHandler = require('./jsFiles/location.js');
const weatherHandler = require('./jsFiles/weather.js');
const trailsHandler = require('./jsFiles/trails.js');
const moviesHandler = require('./jsFiles/movies.js');
const yelpHandler = require('./jsFiles/yelp.js');

app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', trailsHandler);
app.get('/movies', moviesHandler);
app.get('/yelp', yelpHandler);
app.use('*', handler.notFoundHandler);
app.use(handler.errorHandler);
