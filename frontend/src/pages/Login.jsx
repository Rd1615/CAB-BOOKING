import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";

export default function LoginPage() {
  const {login} = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    login(form);
    console.log("Login Data:", form);
    await navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left - Form */}
        <div className="p-10">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-purple-600 rounded-sm"></div>
              <span className="font-semibold text-gray-700">CabEase</span>
            </div>
            <h2 className="text-2xl font-semibold text-purple-700 mt-4">
              Welcome Back
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border-b border-gray-300 focus:border-purple-500 bg-transparent outline-none py-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full border-b border-gray-300 focus:border-purple-500 bg-transparent outline-none py-2"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-purple-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-purple-700 transition"
            >
              Login
            </button>

            {/* Links */}
            <div className="text-center mt-4 text-sm text-gray-600 space-y-2">
              <p>
                Don’t have an account?{" "}
                <Link to="/register" className="text-purple-600 font-medium hover:underline">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-purple-500 hover:underline">
                  Forgot your password?
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right - Cab Booking Themed Panel */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-black text-white p-10">
          <div className="max-w-sm text-center">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Your Ride, <span className="text-purple-300">One Tap</span> Away
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Log in to book cabs instantly, track your rides,  
              and enjoy a seamless travel experience with CabEase.
            </p>
            <div className="h-1 w-16 bg-purple-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
