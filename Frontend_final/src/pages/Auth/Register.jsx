import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthDivider from "../../components/auth/AuthDivider";
import SocialLoginButton from "../../components/auth/SocialLoginButton";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import { registerUser, verifyOtp } from "../../redux/auth/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, registrationPendingVerification } = useSelector((state) => state.auth);

  const validate = () => {
    if (!name.trim()) return "Name is required.";
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces.";
    if (!/^[a-zA-Z0-9_]{4,20}$/.test(username)) return "Username must be 4-20 characters and contain only letters, numbers, or underscores.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return "Password must include uppercase, lowercase, a number, and a special character.";
    }
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setFormError(err);
    setFormError("");

    await dispatch(registerUser({ name, username, email, password }));
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return setFormError("Enter the OTP code.");
    setFormError("");

    const result = await dispatch(verifyOtp({ otp }));
    if (verifyOtp.fulfilled.match(result)) {
      alert("Registration and email verification successful! You can now sign in.");
      navigate("/login");
    }
  };

  if (registrationPendingVerification) {
    return (
      <AuthLayout
        title="Verify your account"
        subtitle="We've sent an OTP code to your email. Enter it below to complete verification."
      >
        <form onSubmit={handleVerifyOtp} className="space-y-5 text-left font-sans">
          {/* OTP Code */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Verification Code (OTP)
            </label>
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full h-10 text-center tracking-widest font-bold"
            />
          </div>

          {/* Error Output */}
          {(formError || error) && (
            <p className="text-xs text-destructive font-semibold">
              {formError || error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-10"
          >
            {status === "loading" ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join a community of enthusiasts mapping cinema's soul."
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-9"
          />
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Username
          </label>
          <Input
            type="text"
            placeholder="johndoe_films"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-9"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-9"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-9"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-9"
          />
        </div>

        {/* Error Output */}
        {(formError || error) && (
          <p className="text-xs text-destructive font-semibold">
            {formError || error}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-10 mt-2"
        >
          {status === "loading" ? "Creating account..." : "Register"}
        </Button>

        {/* Divider */}
        <AuthDivider />

        {/* Social Actions */}
        <div className="space-y-2">
          <SocialLoginButton provider="Google" onClick={() => navigate("/onboarding")} />
          <SocialLoginButton provider="GitHub" onClick={() => navigate("/onboarding")} />
        </div>

        {/* Redirect toggle */}
        <div className="text-center text-xs text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
export { Register };
