var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var mongoose = require('mongoose');

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
// AGGREGATION - average rating for a movie
router.get('/movie/:movieId/average-rating', async function(req, res) {
    try {
    const result = await Review.aggregate([
        { $match: { movie: new mongoose.Types.ObjectId(req.params.movieId) } },
        { 
        $group: { 
            _id: '$movie', 
            averageRating: { $avg: '$rating' }, 
            totalReviews: { $sum: 1 } 
        } 
        }
    ]);

    if (result.length === 0) {
        return res.json({ averageRating: 0, totalReviews: 0 });
    }

    res.json({
      averageRating: Math.round(result[0].averageRating * 10) / 10, // round to 1 decimal
        totalReviews: result[0].totalReviews
    });

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