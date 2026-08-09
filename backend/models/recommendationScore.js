const mongoose = require('mongoose');

const recommendationScoreSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogin' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

    scores: {
        genre: Number,
        story: Number,
        action: Number,
        comedy: Number,
        acting: Number,
        music: Number,
        ending: Number,
        emotion: Number,
        direction: Number,

    },

    overallScore: Number,

    generatedAt: Date
})

module.exports = mongoose.model('RecommendationScore', recommendationScoreSchema);