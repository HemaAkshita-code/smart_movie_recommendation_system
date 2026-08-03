var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Review = require('../models/review');
var TasteProfile = require('../models/tasteProfile');

// GET - calculate (and save) a user's taste profile based on highly-rated reviews
router.get('/:userId', async function(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);

    // genres from movies the user rated 4 or 5
    const genreResults = await Review.aggregate([
      { $match: { user: userId, rating: { $gte: 4 } } },
      { $lookup: { from: 'movies', localField: 'movie', foreignField: '_id', as: 'movieInfo' } },
      { $unwind: '$movieInfo' },
      { $unwind: '$movieInfo.genre' },
      { $group: { _id: '$movieInfo.genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // actors from the same set of movies
    const actorResults = await Review.aggregate([
      { $match: { user: userId, rating: { $gte: 4 } } },
      { $lookup: { from: 'movies', localField: 'movie', foreignField: '_id', as: 'movieInfo' } },
      { $unwind: '$movieInfo' },
      { $unwind: '$movieInfo.cast' },
      { $group: { _id: '$movieInfo.cast', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // directors from the same set of movies
    const directorResults = await Review.aggregate([
      { $match: { user: userId, rating: { $gte: 4 } } },
      { $lookup: { from: 'movies', localField: 'movie', foreignField: '_id', as: 'movieInfo' } },
      { $unwind: '$movieInfo' },
      { $group: { _id: '$movieInfo.director', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    const favoriteGenres = genreResults.map(g => ({ genre: g._id, count: g.count }));
    const favoriteActors = actorResults.map(a => ({ actor: a._id, count: a.count }));
    const favoriteDirectors = directorResults.map(d => ({ director: d._id, count: d.count }));

    // save/update the profile so it's stored, not just calculated on the fly
    const profile = await TasteProfile.findOneAndUpdate(
      { user: userId },
      { favoriteGenres, favoriteActors, favoriteDirectors, updatedAt: new Date() },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(profile);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;