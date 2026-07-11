
const userLoginModel = require('../models/users');
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function createUser(name, username, email, password) 
{
    const hashedPassword = await bcrypt.hash(password, 10);
        const registeredUser = await userLoginModel.create({
          name: name,
          username: username,
          email: email,
          password: hashedPassword
        });
    return registeredUser;
}

async function sendVerificationOtp(user) 
{
    const otp = crypto.randomInt(100000, 1000000).toString();
    console.log(`Generated OTP: ${otp}`); 
    const hashedOTP = await bcrypt.hash(otp, 10);
    
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); 
    user.otp = hashedOTP;
    user.otp_expiration = otpExpiration;
    await user.save();

    
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

}

async function verifyOtp(user, otp)
{
  if (new Date() > user.otp_expiration) 
  {
    throw new Error("OTP expired");
  }

  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) 
  {
    throw new Error("Invalid OTP");
  }

}

async function clearOtp(user)
{
  user.otp = null;
  user.otp_expiration = null;
  await user.save();
}

async function getUserFromCookie(cookieName, req) 
{
    const id = req.cookies[cookieName];

    if (!id)
        throw new Error("Session expired");

    const user = await userLoginModel.findById(id);

    if (!user)
        throw new Error("User not found");

    return user;
}

async function findExistingUser(criteria1, value1, criteria2, value2, criteria3, value3)
{
  return await userLoginModel.findOne({ [criteria1]: value1, [criteria2]: value2, [criteria3]: value3 });
}


async function findUser(criteria, value)
{
  return await userLoginModel.findOne({ [criteria] : value });
}

async function verifyEmail(user, otp)
{
    await verifyOtp(user, otp);
    user.isVerified = true;
    await user.save();
    await clearOtp(user);
} 

async function verifyResetOtp(user, otp)
{
    await verifyOtp(user, otp);
    user.resetOtpVerified = true;
    await user.save();
    await clearOtp(user);
}

async function resetPassword(user, newPassword, retypedPassword)
{
    if(newPassword !== retypedPassword)
    {
        throw new Error('Passwords do not match');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.updated_at = new Date();
    user.resetOtpVerified = false;
    await user.save();
    
}

async function validateUserCredentials(username, email, name, password)
{
      if(!name || !username || !email || !password || !name.trim() || !username.trim() || !email.trim() || !password.trim())
      {
        throw new Error('All fields are required');
      }
      if((!/^[a-zA-Z\s]+$/.test(name)))
      {
        throw new Error('Name can only contain letters and spaces');
      }
      if(!/^[a-zA-Z0-9_]{4,20}$/.test(username))
      {
        throw new Error('Username must be 4-20 characters long and can only contain letters, numbers, and underscores');
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      {
        throw new Error('Invalid email format');
      }
      if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))
      {
        throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
      }
      const existingUser = await findExistingUser('username', username, 'email', email, 'name', name);

      if(existingUser)
      {
        if(await bcrypt.compare(password, existingUser.password))
        {
          if(!existingUser.isVerified)
          {
            return {
                    status: "UNVERIFIED_USER",
                    user: existingUser
                };
            // res.redirect('/verify-otp');
            
          }

            throw new Error('Account already exists, please sign in.');
          
        }

        if(!existingUser.isVerified)
        {
          throw new Error('Incorrect password or an account already exists with this username and email, please verify your account.');
        }

          throw new Error('Incorrect password or an account already exists with this username and email, please sign in.');
        
      }

      if(await findUser('username', username)) 
      {
        throw new Error('This Username already exists');
      }

      if(await findUser('email', email)) 
      {
        throw new Error('An account with this email already exists!');
      }

      return {status: "NEW_USER"};
}

async function login(user, password)
{
  return await bcrypt.compare(password, user.password);
}

module.exports = {
    createUser,
    sendVerificationOtp,
    verifyEmail,
    verifyResetOtp,
    resetPassword,
    getUserFromCookie,
    findUser,
    findExistingUser,
    validateUserCredentials,
    login,
    verifyOtp,
    clearOtp
};