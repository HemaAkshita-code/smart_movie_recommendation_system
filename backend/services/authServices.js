
const userLoginModel = require('../models/users');

async function createUser(name, username, email, password) {
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

    const user = await UserLoginModel.findById(id);

    if (!user)
        throw new Error("User not found");

    return user;
}

async function findUserByUsername(username)
{
  const foundUser = await userLoginModel.findOne({ username: username });
  return foundUser;
}

async function verifyUserMailID(user, otp)
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

async function resetPassword(user, newPassword)
{
    if(req.body.password === req.body.retypedPassword)
    {
        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetOtpVerified = false;
        await user.save();
    }
    else
    {
        throw new Error('Passwords do not match');
    } 
}