
const userLoginModel = require('../models/users');
const bcrypt = require('bcrypt');
const authServices = require('../services/authServices');
const jwt = require("jsonwebtoken");

const secret = "Hulallallallaleo-Hulallallallaleo";

function verifyToken(req, res, next) {

    let token = req.cookies.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
        return res.status(401).json({
            error: "Please sign in."
        });

    try {

        const decoded = jwt.verify(
            token,
            secret
        );
        
        req.user = decoded;

        next();

    }
    catch {

        return res.status(401).json({
            error: "Invalid token"
        });

    }

}

async function register(req, res, next) {

    try 
    {

        const result = await authServices.validateUserCredentials(req.body.username, req.body.email, req.body.name, req.body.password);

        if (result.status === "UNVERIFIED_USER") 
        {
            res.cookie("pendingUserId", result.user._id.toString(), {
                httpOnly: true,
                maxAge: 10 * 60 * 1000
            });

            return res.status(400).json({
                error: "This account is already registered but not verified. Please check your email for the OTP."
            });
        }

        const registeredUser = await authServices.createUser(
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password
        );

        res.cookie("pendingUserId", registeredUser._id.toString(), {
        httpOnly: true,
        maxAge: 10 * 60 * 1000
        });

        // res.redirect('/verify-otp');
        res.json({ message: 'User registered successfully. Please check your email for the OTP.' });
    }
    catch(err) 
    {
        res.status(400).json({ error: err.message });
    }

}

async function sendOtp(req, res, next) 
{ // for initial registration and for resend otp
  const user = await authServices.getUserFromCookie("pendingUserId", req);

  if(!user)
  {
    return res.status(400).json({ error: 'User not found' });
  }

  try
  {
    await authServices.sendVerificationOtp(user);
  }
  catch(err)
  {
    return res.status(400).json({ error: err.message });
  }
  
  res.json({ message: 'OTP sent successfully' });
//res.redirect('/verify-otp');
}

async function findUsers(req, res, next) 
{
  try
  {
    const foundUsers = await authServices.findUser('username', req.params.username);
    if(!foundUsers)
    {
      return res.status(400).json({ error: 'User not found' });
    }
  }
  catch(err)
  {
    return res.status(400).json({ error: err.message });
  }
}

async function verifyOtp(req, res, next) 
{
  const user = await authServices.getUserFromCookie("pendingUserId", req);

  if(!user)
  {
    return res.status(400).json({ error: 'User not found' });
  }

  try 
  {
    await authServices.verifyEmail(user, req.body.otp);
    res.clearCookie("pendingUserId"); // Clear the cookie after successful verification
    res.json({message: "OTP verified successfully"});
  }
  catch(err) 
  {
    res.status(400).json({error: err.message});
  }

//res.redirect('/signin');
  
}

async function signIn(req, res, next) 
{
  let user;
  if (req.body.username) {
    user = await authServices.findUser('username', req.body.username);
  } else if (req.body.email) {
    user = await authServices.findUser('email', req.body.email.toLowerCase());
  }

  if (!user) 
  {
    return res.status(400).json({ error: 'Invalid username/email or password' });
  }

  if (!user.isVerified)
  {
    return res.status(400).json({ error: 'Account not verified. Please check your email for the OTP.' });
  }

  try
  {
    const isMatch = await authServices.login(user, req.body.password);
    if (!isMatch) 
    {
      return res.status(400).json({ error: 'Invalid username/email or password' });
    }

    const token = await authServices.createToken(user);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,      // true in production (HTTPS)
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Sign in successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    });
  }
  catch(err)
  {
    return res.status(400).json({ error: err.message });
  }

}

async function forgotPassword(req, res)  
{
    const user = await authServices.findUser('username', req.body.username);
    if (!user) 
    {
      return res.status(400).json({ error: 'User not found' });
    }

    res.cookie("resetPasswordUserId", user._id.toString(), {
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    });
    try
    {
      await authServices.sendVerificationOtp(user);
    }
    catch(err)
    {
      return res.status(400).json({ error: err.message });
    }

    res.json({message: 'OTP sent successfully' });

    // res.redirect('/verify-reset-otp');
}

async function verifyResetOtp(req, res)
{
  
  const user = await authServices.getUserFromCookie("resetPasswordUserId", req);

  if(!user)
  {
    return res.status(400).json({ error: 'User not found' });
  }

  try 
  {
    await authServices.verifyResetOtp(user, req.body.otp);
    res.json({message: "OTP verified successfully"});
  }
  catch(err) 
  {
    res.status(400).json({error: err.message});
  }

  // res.redirect('/reset-password');
}

async function resetPassword(req, res)
{

  const user = await authServices.getUserFromCookie("resetPasswordUserId", req);
  if (!user) 
  {
    return res.status(400).json({ error: 'User not found' });
  }

  if(!user.resetOtpVerified)
  {
    return res.status(400).json({ error: 'OTP is not verified' });
  }

  try
  {
    await authServices.resetPassword(user, req.body.password, req.body.retypedPassword);
    res.clearCookie("resetPasswordUserId");
    res.json({ message: 'Password reset successful' });
  }
  catch(err)
  {
    res.status(400).json({error: err.message});
  }

}

async function getMe(req, res) {
  try {
    const user = await userLoginModel.findById(req.user.id).select('-password -otp -otp_expiration');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
  res.json({ message: "Logout successful" });
}

module.exports = {
    register,
    sendOtp,
    verifyOtp,
    signIn,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    findUsers,
    verifyToken,
    getMe,
    logout
};