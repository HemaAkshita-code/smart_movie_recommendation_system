import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

const Login = () => {
  return (
    <MainLayout>
      <div className="max-w-[400px] w-full mx-auto px-4 py-[96px] flex flex-col justify-center">
        <div className="bg-card p-8 rounded-card shadow-elevation-1 border border-border/40">
          <h1 className="text-2xl font-heading font-bold mb-4 text-center">Sign In</h1>
          <p className="text-muted-foreground text-center text-sm mb-6">
            Sign in to access personalized recommendations and update your Taste DNA.
          </p>
          <div className="space-y-4">
            <button className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-btn hover:opacity-90 transition-opacity">
              Sign In (Placeholder)
            </button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
