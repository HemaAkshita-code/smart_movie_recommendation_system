const Movie = require("../models/movies");
const userWatchHistory = require("../models/userWatchHistory");
const userWatchList = require("../models/watchlist");

async function updateWatchHistory(userId, movie)
{
    let history = await userWatchHistory.findOne({ user: userId, movie: movie._id });
    if (!history) {
        history = new userWatchHistory({
            user: userId,
            movie: movie._id,
            watchTime: movie.duration,
            rewatchCount: 1
        });
    } else {
        history.rewatchCount += 1;
        history.watchTime = movie.duration;
    }
    await history.save();
}

async function updateWatchList(userId, movie)
{
    let entry = await userWatchList.findOne({ user: userId, movie: movie._id });
    if (!entry) {
        entry = new userWatchList({
            user: userId,
            movie: movie._id,
            status: "Watching"
        });
    } else {
        entry.status = "Watching";
    }
    await entry.save();
}

async function getMovieByName(movieName)
{
    return await Movie.findOne({title : movieName});
}

module.exports = {updateWatchHistory, updateWatchList, getMovieByName};