
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/smart_movie_recommendation_system');

const userTasteGraphSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserLogin",
        required: true,
        unique: true
    },

    genres: {
        type: Map,
        of: Number,
        default: {}
    },

    themes: {
        type: Map,
        of: Number,
        default: {}
    },

    actors: {
        type: Map,
        of: Number,
        default: {}
    },

    directors: {
        type: Map,
        of: Number,
        default: {}
    },

    languages: {
        type: Map,
        of: Number,
        default: {}
    },

    reviewAnalysis: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

const UserTasteGraphModel = mongoose.model('UserTasteGraph', userTasteGraphSchema);

module.exports = UserTasteGraphModel;