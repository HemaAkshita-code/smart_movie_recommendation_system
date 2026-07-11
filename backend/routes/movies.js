var express = require('express');
var router = express.Router();
var Movie = require('../models/movies');

// CREATE

router.post('/', async function(req, res) {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// =======================
// READ ALL
// =======================
router.get('/', async function(req, res) {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =======================
// SEARCH
// Check MongoDB first
// If not found -> TMDB
// Save in MongoDB
// =======================
router.get('/search', async function(req, res) {
    try {
        const query = req.query.query;

        if (!query) {
            return res.status(400).json({
                error: 'Query parameter is required'
            });
        }

        // ----------------------------
        // 1. Search MongoDB
        // ----------------------------
        const existingMovie = await Movie.findOne({
            title: new RegExp(query, 'i')
        });

        if (existingMovie) {
            return res.json({
                source: 'database',
                movie: existingMovie
            });
        }

        // ----------------------------
        // 2. Search TMDB
        // ----------------------------
        const searchResponse = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}`
        );

        const searchData = await searchResponse.json();

        if (!searchData.results || searchData.results.length === 0) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }

        const result = searchData.results[0];

        // ----------------------------
        // 3. Fetch Details & Credits
        // ----------------------------
console.log("Movie ID:", result.id);

console.log("Fetching details...");
const detailsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${result.id}?api_key=${process.env.TMDB_API_KEY}`
);
console.log("Details status:", detailsResponse.status);

console.log("Fetching credits...");
const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=${process.env.TMDB_API_KEY}`
);
console.log("Credits status:", creditsResponse.status);

        const details = await detailsResponse.json();
        const credits = await creditsResponse.json();

        // ----------------------------
        // 4. Extract Genres
        // ----------------------------
        const genres = details.genres
            ? details.genres.map(g => g.name)
            : [];

        // ----------------------------
        // 5. Extract Top 5 Cast
        // ----------------------------
        const cast = credits.cast
            ? credits.cast.slice(0, 5).map(actor => actor.name)
            : [];

        // ----------------------------
        // 6. Save to MongoDB
        // ----------------------------
        const newMovie = await Movie.create({
            title: details.title,
            description: details.overview,
            genre: genres,
            releaseYear: details.release_date
                ? parseInt(details.release_date.substring(0, 4))
                : null,
            coverImage: details.poster_path
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                : null,
            cast: cast
        });

        // ----------------------------
        // 7. Return Movie
        // ----------------------------
        res.json({
            source: 'tmdb',
            movie: newMovie
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// READ ONE
// =======================
router.get('/:id', async function(req, res) {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }

        res.json(movie);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// UPDATE
// =======================
router.put('/:id', async function(req, res) {
    try {

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!movie) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }

        res.json(movie);

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// =======================
// DELETE
// =======================
router.delete('/:id', async function(req, res) {
    try {

        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                error: 'Movie not found'
            });
        }

        res.json({
            message: 'Movie deleted'
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;