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