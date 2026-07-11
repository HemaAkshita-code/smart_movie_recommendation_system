
const userLoginModel = require('../models/users');
const bcrypt = require('bcrypt');
const authServices = require('../services/authServices');

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
  const user = await authServices.findUser('username', req.body.username );
  if (!user) 
  {
    return res.status(400).json({ error: 'Invalid username or password' });
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
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Sign in successful' });
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

module.exports = {
    register,
    sendOtp,
    verifyOtp,
    signIn,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    findUsers
};