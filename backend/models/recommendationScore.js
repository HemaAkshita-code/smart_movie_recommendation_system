const mongoose = require('mongoose');

const recommendationScoreSchema = mongoose.Schema({
    user: ObjectId,
    movie: ObjectId,

    scores: {
        genre: Number,
        story: Number,
        action: Number,
        comedy: Number,
        acting: Number,
        music: Number,
        ending: Number,
        emotion: Number
    },

    overallScore: Number,

    generatedAt: Date
})

module.exports = mongoose.model(recommendationScoreSchema);