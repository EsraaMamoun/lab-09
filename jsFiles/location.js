'use strict';

const superagent = require('superagent');

function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}

function locationHandler(request, response) {
    const city = request.query.city;
    const theDatabaseQuery = 'SELECT search_query, formatted_query, latitude, longitude FROM locations WHERE search_query LIKE $1'
    client.query(theDatabaseQuery, [city]).then((result) => {
        if (result.rows.length > 0) {
            response.status(200).json(result.rows[0]);
        } else {
            superagent(
                `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
            ).then((res) => {
                const geoData = res.body;
                const theLocation = new Location(city, geoData);
                const SQL = 'INSERT INTO locations(search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4)';
                const theResults = [theLocation.search_query, theLocation.formatted_query, theLocation.latitude, theLocation.longitude];
                client.query(SQL, theResults).then(result => {
                    response.status(200).json(theLocation);
                }).catch(err => {
                    response.status(500).send(err);
                })
            }).catch((err) => {
                errorHandler(err, request, response);
            });
        }
    });
}

module.exports = locationHandler;