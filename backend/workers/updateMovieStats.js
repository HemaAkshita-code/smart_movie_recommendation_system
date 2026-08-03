const Movie = require('../models/movies');
const Review = require('../models/review');

async function updateMovieStats() {
  try {
    const movies = await Movie.find();

    for (const movie of movies) {
      const stats = await Review.aggregate([
        { $match: { movie: movie._id } },
        { 
          $group: { 
            _id: '$movie', 
            avgRating: { $avg: '$rating' }, 
            reviewCount: { $sum: 1 } 
          } 
        }
      ]);

      const avgRating = stats.length > 0 ? Math.round(stats[0].avgRating * 10) / 10 : 0;
      const reviewCount = stats.length > 0 ? stats[0].reviewCount : 0;

      // simple trending score: more reviews + higher rating = more trending
      const trendingScore = Math.round((avgRating * reviewCount) * 10) / 10;

      await Movie.findByIdAndUpdate(movie._id, {
        avgRating,
        reviewCount,
        trendingScore
      });
    }

    console.log(`[Worker] Updated stats for ${movies.length} movies at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('[Worker] Failed to update movie stats:', err.message);
  }
}

module.exports = updateMovieStats;