var express = require('express');
var router = express.Router();
const UserLoginModel = require('../models/users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const authController = require('../controllers/authControllers');

router.get('/profile/:username', authController.verifyToken, async (req, res) => {
  try 
  {
    const username = req.params.username;
    const user = await UserLoginModel.findOne({ username: username });
    if (!user) 
    {
      return res.status(404).json({ error: 'User not found' });
    }
    userProfileData = {
      name: user.name,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    res.json(userProfileData);
  } 
  catch (err) 
  {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
