'use strict';

const superagent = require('superagent');
require('dotenv').config();

function Movies(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_vote = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
}

function moviesHandler(request, response) {
    const cityQuery = request.query.city;
    superagent(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&city=${cityQuery}`)
        .then((moviesRes) => {
            const moviesData = moviesRes.body.results.map((movie) => {
                return new Movies(movie);
            });
            response.status(200).json(moviesData);
        }).catch((err) => errorHandler(err, request, response));
}


module.exports = moviesHandler;