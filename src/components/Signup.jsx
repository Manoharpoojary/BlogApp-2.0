import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../features/authSlice";
import { Button, Input, Logo } from "./index";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.addUser({
        email: data.email,
        password: data.password,
        username: data.name,
      });
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login({ userData: user }));
          navigate("/");
        }
      } else {
        setError("Unable to create account. The email may already be registered.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-10">
      <div className="w-full max-w-md glass-card p-8 md:p-10 animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo width="160px" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-center gradient-text mb-2">
          Create your account
        </h1>
        <p className="text-center text-sm text-[var(--text-muted)] mb-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--accent-mid)] hover:text-[var(--accent-start)] font-medium transition-colors"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div className="error-alert flex items-center gap-2 mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Minimum 8 characters"
            {...register("password", { required: true, minLength: 8 })}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
