const Movie = require("../models/movies");
const userWatchHistory = require("../models/userWatchHistory")

async function updateWatchHistory(userId, movie)
{
    userWatchHistory.user = userId;
    userWatchHistory.movie = movie._id;
    userWatchHistory.watchTime = movie.duration;
    userWatchHistory.rewatchCount += 1;
    
    userWatchHistory.save();

}

async function getMovieByName(movieName)
{
    return await Movie.findOne({title : movieName});
}

module.exports = {updateWatchList};