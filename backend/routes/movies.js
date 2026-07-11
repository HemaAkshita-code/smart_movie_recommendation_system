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

// READ ALL
router.get('/', async function(req, res) {
try {
    const movies = await Movie.find();
    res.json(movies);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// SEARCH - check DB first, fallback to TMDB
// MUST come before router.get('/:id') or Express will treat "search" as an :id
router.get('/search', async function(req, res) {
try {
    const query = req.query.query;
    if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
    }

    // 1. Check MongoDB first
    const existingMovie = await Movie.findOne({ title: new RegExp(query, 'i') });
    if (existingMovie) {
        return res.json({ source: 'database', movie: existingMovie });
    }

    // 2. Not found — fetch from TMDB
    const tmdbResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}`
    );
    const tmdbData = await tmdbResponse.json();

    if (!tmdbData.results || tmdbData.results.length === 0) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    const result = tmdbData.results[0]; // take the top match

    // 3. Save to MongoDB
    const newMovie = await Movie.create({
        title: result.title,
        description: result.overview,
        genre: [],
        releaseYear: result.release_date ? parseInt(result.release_date.substring(0, 4)) : null,
        coverImage: result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : null,
        cast: []
    });

    res.json({ source: 'tmdb', movie: newMovie });

    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get('/:id', async function(req, res) {
    try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async function(req, res) {
    try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async function(req, res) {
    try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;