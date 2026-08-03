const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/smart_movie_recommendation_system');

const userSearchHistorySchema = mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogin', required: true },
   query: { type: String, required: true },
   searched_at: { type: Date, default: Date.now }
})

const UserSearchHistoryModel = mongoose.model('UserSearchHistory', userSearchHistorySchema);

module.exports = UserSearchHistoryModel;