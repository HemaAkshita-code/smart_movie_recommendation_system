
const userLoginModel = require('../models/users');
const bcrypt = require('bcrypt');
const authServices = require('../services/authServices');

async function register(req, res, next) {

  const existingUser = await userLoginModel.findOne({ username: req.body.username, email: req.body.email, name: req.body.name});
  if(existingUser)
  {
    if(await bcrypt.compare(req.body.password, existingUser.password))
    {
      if(!existingUser.isVerified)
      {
        res.cookie("pendingUserId", existingUser._id.toString(), {
          httpOnly: true,
          maxAge: 10 * 60 * 1000
        });
        // res.redirect('/verify-otp');
        return res.status(400).json({ error: 'This account is already registered but not verified. Please check your email for the OTP.' });
      }
      else
      {
        return res.status(400).json({ error: 'Account already exists, please sign in.' });
      }
    }
    else if(!existingUser.isVerified)
    {
      return res.status(400).json({ error: 'Incorrect password or an account already exists with this username and email, please verify your account.' });
    }
    else
    {
      return res.status(400).json({ error: 'Incorrect password or an account already exists with this username and email, please sign in.' });
    }
  }
  else if(!req.body.name.trim() || !req.body.username.trim() || !req.body.email.trim() || !req.body.password.trim())
  {
    return res.status(400).json({ error: 'All fields are required' });
  }
  else if((!/^[a-zA-Z\s]+$/.test(req.body.name)))
  {
    return res.status(400).json({ error: 'Name can only contain letters and spaces' });
  }
  else if(!/^[a-zA-Z0-9_]{4,20}$/.test(req.body.username))
  {
    return res.status(400).json({ error: 'Username must be 4-20 characters long and can only contain letters, numbers, and underscores' });
  }
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email))
  {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(req.body.password))
  {
    return res.status(400).json({ error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character' });
  }
  else if(await userLoginModel.findOne({ username: req.body.username })) 
  {
    return res.status(400).json({ error: 'This Username already exists' });
  }
  else if(await userLoginModel.findOne({ email: req.body.email })) 
  {
    return res.status(400).json({ error: 'An account with this email already exists!' });
  }
  else
  {
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

}

async function sendOtp(req, res, next) 
{ // for initial registration and for resend otp
  const user = await getUserFromCookie("pendingUserId", req);

  if(!user)
  {
    return res.status(400).json({ error: 'User not found' });
  }

  await authServices.sendVerificationOtp(user);
  res.json({ message: 'OTP sent successfully' });
//res.redirect('/verify-otp');
}

async function findUsers(req, res, next) 
{
  const foundUser = await authServices.findUserByUsername(req.params.username);
  res.json(foundUser);
}

async function verifyOtp(req, res, next) {
  const user = await getUserFromCookie("pendingUserId", req);

  if(!user)
  {
    return res.status(400).json({ error: 'User not found' });
  }

  try 
  {
    await authServices.verifyUserMailID(user, req.body.otp);
    res.clearCookie("pendingUserId"); // Clear the cookie after successful verification
    res.json({message: "OTP verified successfully"});
  }
  catch(err) 
  {
    res.status(400).json({error: err.message});
  }

//res.redirect('/signin');
  
}

async function signIn(req, res, next) {
  const user = await userLoginModel.findOne({ username: req.body.username });
  if (!user) 
  {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  if (!user.isVerified)
  {
    return res.status(400).json({ error: 'Account not verified. Please check your email for the OTP.' });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) 
  {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  res.json({ message: 'Sign in successful' });
}
async function forgotPassword(req, res)  
{
    const user = await UserLoginModel.findOne({ username: req.body.username });
    if (!user) 
    {
      return res.status(400).json({ error: 'User not found' });
    }

    res.cookie("resetPasswordUserId", user._id.toString(), {
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    });

    await authServices.sendVerificationOtp(user);
    res.json({message: 'OTP sent successfully' });

    // res.redirect('/verify-reset-otp');
}

async function verifyResetOtp(req, res)
{
  
  const user = await getUserFromCookie("resetPasswordUserId", req);

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