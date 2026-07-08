var express = require('express');
var router = express.Router();
const UserLoginModel = require('../models/users');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/register', async function(req, res, next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if(await UserLoginModel.findOne({ username: req.body.username })) 
  {
    return res.status(400).json({ error: 'Username already exists, please sign in!' });
  }
  else if(await UserLoginModel.findOne({ email: req.body.email })) 
  {
    return res.status(400).json({ error: 'An account with this email already exists, please sign in!' });
  }
  else
  {
    const registeredUser = await UserLoginModel.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.json(registeredUser);
  }

});

router.post('/signin', async function(req, res, next) {
  const user = await UserLoginModel.findOne({ username: req.body.username });
  if (!user) 
  {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) 
  {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  res.json({ message: 'Sign in successful' });
});

router.get('/search/:username', async function(req, res, next) {
  const foundUser = await UserLoginModel.findOne({ username: req.params.username });
  res.json(foundUser);
});

module.exports = router;
