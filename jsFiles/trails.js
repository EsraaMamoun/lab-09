'use strict';

const superagent = require('superagent');
require('dotenv').config();
const handler = require('../handler.js');

function Tralis(theTrails) {
    this.name = theTrails.name;
    this.location = theTrails.location;
    this.length = theTrails.length;
    this.stars = theTrails.stars;
    this.star_votes = theTrails.starVotes;
    this.summary = theTrails.summary;
    this.trail_url = theTrails.trail_url;
    this.conditions = theTrails.conditionStatus;
    this.condition_date = theTrails.conditionDate.slice(0,10);
    this.condition_time = theTrails.conditionDate.slice(12,19);
}

function trailsHandler(request, response) {
    superagent(`https://www.hikingproject.com/data/get-trails?lat=${request.query.latitude}&lon=${request.query.longitude}&maxDistance=400&key=${process.env.TRAIL_API_KEY}`)
    .then((trailsRes) => {
        const trailsData = trailsRes.body.trails.map((theTrails) => {
            return new Tralis(theTrails);
        });
        response.status(200).json(trailsData);
    }).catch((err) => handler.errorHandler(err, request, response));
}

module.exports = trailsHandler;
