const Movie = require("../models/movies");
const userWatchHistory = require("../models/userWatchHistory")

async function updateWatchList(userId, movie, count = null)
{
    userWatchHistory.user = userId;
    userWatchHistory.movie = movie._id;
    userWatchHistory.watchTime = movie.duration;
    if(count)
    {
        userWatchHistory.rewatchCount = count;
    }
    userWatchHistory.save();

}

async function getMovieByName(movieName)
{
    return await Movie.findOne({title : movieName});
}

module.exports = {updateWatchList};