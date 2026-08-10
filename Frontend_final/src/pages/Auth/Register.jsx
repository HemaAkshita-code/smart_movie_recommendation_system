import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthDivider from "../../components/auth/AuthDivider";
import SocialLoginButton from "../../components/auth/SocialLoginButton";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import { registerUser } from "../../redux/auth/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setFormError(err);
    setFormError("");

    const result = await dispatch(registerUser({ email, password }));
    if (registerUser.fulfilled.match(result)) {
      navigate("/onboarding");
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join a community of enthusiasts mapping cinema's soul."
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-left font-sans">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-10"
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
          {status === "loading" ? "Creating account..." : "Register"}
        </Button>

        {/* Divider */}
        <AuthDivider />

        {/* Social Actions */}
        <div className="space-y-3">
          <SocialLoginButton provider="Google" onClick={() => navigate("/onboarding")} />
          <SocialLoginButton provider="GitHub" onClick={() => navigate("/onboarding")} />
        </div>

        {/* Redirect toggle */}
        <div className="text-center text-xs text-muted-foreground pt-4">
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
