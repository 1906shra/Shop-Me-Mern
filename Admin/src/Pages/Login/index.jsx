"use client";

import React, { useState, useEffect,useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Load "Remember Me" state from LocalStorage on component mount
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(savedRememberMe);

    if (savedRememberMe) {
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) setEmail(savedEmail);
    }
  }, []);

  // Handle checkbox for "Remember Me"
  const handleCheckboxChange = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);
    localStorage.setItem("rememberMe", newRememberMe);

    if (!newRememberMe) {
      localStorage.removeItem("email");
    }
  };

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    console.log("Logging in with:", { email, password });

    if (rememberMe) {
      localStorage.setItem("email", email);
    }

    // Simulating authentication (Replace with API call)
    alert("Login successful! OTP sent to your email.");
    navigate("/verify", { state: { email } }); // Redirect to OTP verification page with email
  };

  // Forgot Password functionality
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };


  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600">Please login to your account</p>

        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200">
          <FcGoogle size={24} />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <hr className="w-full border-gray-300" />
          <span className="text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-red-400"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button type="button" onClick={handleForgotPassword} className="text-red-400 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition duration-200 font-medium shadow-md"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/Signup" className="text-red-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
