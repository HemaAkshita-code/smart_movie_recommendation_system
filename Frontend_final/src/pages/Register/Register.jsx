import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/layout/MainLayout";
import { registerUser } from "../../redux/auth/authSlice";

const Register = () => {
  const [form, setForm] = useState({ displayName: "", email: "", password: "" });
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.displayName.trim()) return "Display name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setFormError(err);
    setFormError("");

    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      navigate("/watchlist");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-[400px] w-full mx-auto px-4 py-[96px] flex flex-col justify-center">
        <div className="bg-card p-8 rounded-card shadow-elevation-1 border border-border/40">
          <h1 className="text-2xl font-heading font-bold mb-4 text-center">Create Account</h1>
          <p className="text-muted-foreground text-center text-sm mb-6">
            Join CineCompass to discover movies that match your unique cinematic taste.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="displayName"
              placeholder="Display name"
              value={form.displayName}
              onChange={handleChange}
              className="w-full p-2 rounded-btn border border-border/40 bg-background text-foreground text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded-btn border border-border/40 bg-background text-foreground text-sm"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
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
              {status === "loading" ? "Creating account..." : "Sign Up"}
            </button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;