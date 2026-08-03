var express = require('express');
var router = express.Router();
var UserLogin = require('../models/users');

// GET profile - returns user info, excluding sensitive fields
router.get('/:id', async function(req, res) {
  try {
    const user = await UserLogin.findById(req.params.id).select('-password -otp -otp_expiration');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE profile - only allows editing name, not email/username/password
router.put('/:id', async function(req, res) {
  try {
    const allowedUpdates = { name: req.body.name };

    const user = await UserLogin.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true, runValidators: true }
    ).select('-password -otp -otp_expiration');

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;