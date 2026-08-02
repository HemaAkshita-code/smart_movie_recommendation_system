import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthDivider from "../../components/auth/AuthDivider";
import SocialLoginButton from "../../components/auth/SocialLoginButton";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Switch from "../../components/ui/switch";
import { loginUser } from "../../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setFormError(err);
    setFormError("");

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/onboarding");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to resume curating your personal movie universe."
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
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 block">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between py-1.5 border-y border-border/10">
          <span className="text-xs text-muted-foreground">Remember this browser</span>
          <Switch checked={rememberMe} onChange={setRememberMe} />
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
          {status === "loading" ? "Signing in..." : "Sign In"}
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
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Sign up for free
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
export { Login };
