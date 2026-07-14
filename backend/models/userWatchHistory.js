
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/smart_movie_recommendation_system');

const userWatchHistorySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogin', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    watchedPercentage: {type: Number, default : 0},
    watchTime: {type : Number, default: 0},
    rewatchCount: {type: Number, default: 1}
})

const userWatchHistoryModel = mongoose.model('userWatchHistory', userWatchHistorySchema);

module.exports = userWatchHistoryModel;