'use strict';

const superagent = require('superagent');
require('dotenv').config();
const handler = require('../handler.js');

function Yelp(yelp) {
    this.name = yelp.name;
    this.image_url = yelp.image_url;
    this.price = yelp.price;
    this.rating = yelp.rating;
    this.url = yelp.url;
}

function yelpHandler(request, response) {
    const cityQuery = request.query.search_query;
    superagent(`https://api.yelp.com/v3/businesses/search?location=${cityQuery}`).set({ "Authorization": `Bearer ${process.env.YELP_API_KEY}` })

        .then((yelpRes) => {
            const yelpData = yelpRes.body.businesses.map((yelp) => {
                return new Yelp(yelp);
            });
            response.status(200).json(yelpData);
        }).catch((err) => handler.errorHandler(err, request, response));
}


module.exports = yelpHandler;
