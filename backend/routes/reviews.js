var express = require('express');
var router = express.Router();
var Review = require('../models/review');

// CREATE
router.post('/', async function(req, res) {
    try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

// READ ALL reviews for a specific movie
router.get('/movie/:movieId', async function(req, res) {
    try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'name');
    res.json(reviews);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get('/:id', async function(req, res) {
    try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async function(req, res) {
    try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

// DELETE
router.delete('/:id', async function(req, res) {
    try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json({ message: 'Review deleted' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;