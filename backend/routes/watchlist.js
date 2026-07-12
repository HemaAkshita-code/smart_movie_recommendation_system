var express = require('express');
var router = express.Router();
var Watchlist = require('../models/watchlist');

// CREATE - add movie to watchlist
router.post('/', async function(req, res) {
    try {
    const entry = await Watchlist.create(req.body);
    res.status(201).json(entry);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

// READ ALL - get a user's full watchlist
router.get('/user/:userId', async function(req, res) {
    try {
    const list = await Watchlist.find({ user: req.params.userId }).populate('movie');
    res.json(list);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// READ ONE entry
router.get('/:id', async function(req, res) {
    try {
    const entry = await Watchlist.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// UPDATE - change status (e.g. "Want to Watch" -> "Watching")
router.put('/:id', async function(req, res) {
    try {
    const entry = await Watchlist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

// DELETE - remove movie from watchlist
router.delete('/:id', async function(req, res) {
    try {
    const entry = await Watchlist.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Removed from watchlist' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;