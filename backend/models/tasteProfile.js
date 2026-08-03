const mongoose = require('mongoose');

const tasteProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogin', required: true, unique: true },
  favoriteGenres: [{ genre: String, count: Number }],
  favoriteActors: [{ actor: String, count: Number }],
  favoriteDirectors: [{ director: String, count: Number }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TasteProfile', tasteProfileSchema);