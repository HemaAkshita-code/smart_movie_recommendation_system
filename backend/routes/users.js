var express = require('express');
var router = express.Router();
const UserLoginModel = require('../models/users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

/* GET users listing. */
router.post('/register', async function(req, res, next) {

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const unverifiedUser = await UserLoginModel.findOne({ username: req.body.username, email: req.body.email , isVerified: false, name: req.body.name});
  if(unverifiedUser && await bcrypt.compare(req.body.password, unverifiedUser.password))
  {
    // res.redirect('/verify-otp');
    return res.status(400).json({ error: 'This account is already registered but not verified. Please check your email for the OTP.' });
  }
  else if(await UserLoginModel.findOne({ username: req.body.username })) 
  {
    return res.status(400).json({ error: 'This Username already exists' });
  }
  else if(await UserLoginModel.findOne({ email: req.body.email })) 
  {
    return res.status(400).json({ error: 'An account with this email already exists!' });
  }
  else if(!req.body.name || !req.body.username || !req.body.email || !req.body.password)
  {
    return res.status(400).json({ error: 'All fields are required' });
  }
  else if((!/^[a-zA-Z\s]+$/.test(req.body.name))||(!/^[a-zA-Z\s]+$/.test(req.body.username)))
  {
    return res.status(400).json({ error: 'Name and username can only contain letters and spaces' });
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))
  {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(req.body.password))
  {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character' });
  }
  else
  {
    const registeredUser = await UserLoginModel.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    res.cookie("pendingUserId", registeredUser._id.toString(), {
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    });

    // res.redirect('/verify-otp');
    console.log(registeredUser);
  }

});

router.post('/verify-otp', async function(req, res, next) {

  const userId = req.cookies.pendingUserId;
  const user = await UserLoginModel.findById(userId);
  console.log(`User ID from cookie: ${userId}`);
   

  if(!user.otp || user.otp_expiration < new Date())
  {
    const otp = crypto.randomInt(100000, 1000000).toString();
    console.log(`Generated OTP: ${otp}`); 
    const hashedOTP = await bcrypt.hash(otp, 10);
    
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); 
    user.otp = hashedOTP;
    user.otp_expiration = otpExpiration;
    await user.save();
  }

  
  

//   await transporter.sendMail({

//     from: process.env.EMAIL,

//     to: user.email,

//     subject: "Verify your email for Smart Movie Recommendation System",

//     html: `
//         <h2>Welcome!</h2>

//         <a href="http://localhost:3000/verify/${verificationToken}">
//             Verify Email
//         </a>
//     `

// });

  if (new Date() > user.otp_expiration) 
  {
    return res.status(400).json({ error: 'OTP has expired' });
  }

  const isMatch = await bcrypt.compare(req.body.otp, user.otp);
  if (!isMatch) 
  {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  user.isVerified = true;
  user.otp = null; // Clear the OTP after successful verification
  user.otp_expiration = null; // Clear the OTP expiration after successful verification
  await user.save();

  res.json({ message: 'OTP verified successfully' });
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
