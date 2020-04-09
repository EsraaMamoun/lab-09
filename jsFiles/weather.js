'use strict';

function Weather(darkskyData) {
    this.forecast = darkskyData.weather.description;
    this.time = (new Date(darkskyData.valid_date)).toDateString();
}

function weatherHandler(request, response) {
    superagent(`https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${process.env.WEATHER_API_KEY}`)
    .then((weatherRes) => {
        const theWeather = weatherRes.body.data.map((darkskyData) => {
            return new Weather(darkskyData);
        });
        response.status(200).json(theWeather);
    }).catch((err) => errorHandler(err, request, response));
}

module.exports = weatherHandler;