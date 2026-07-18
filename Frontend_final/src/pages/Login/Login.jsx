import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/layout/MainLayout";
import { loginUser } from "../../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email.";
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
      navigate("/watchlist");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[400px] w-full mx-auto px-4 py-[96px] flex flex-col justify-center">
        <div className="bg-card p-8 rounded-card shadow-elevation-1 border border-border/40">
          <h1 className="text-2xl font-heading font-bold mb-4 text-center">Sign In</h1>
          <p className="text-muted-foreground text-center text-sm mb-6">
            Sign in to access personalized recommendations and update your Taste DNA.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-btn border border-border/40 bg-background text-foreground text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-btn border border-border/40 bg-background text-foreground text-sm"
            />
            {(formError || error) && (
              <p className="text-sm text-destructive">{formError || error}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-btn hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;