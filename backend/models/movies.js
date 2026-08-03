const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: [{ type: String, required: true }],
    duration: {type: number, required: true},
    director: { type: String, required: true },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    trendingScore: { type: Number, default: 0 },
    releaseYear: { type: Number, required: true },
    coverImage: { type: String },
    cast: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);