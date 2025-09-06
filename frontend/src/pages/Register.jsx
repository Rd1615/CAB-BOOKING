import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Registration() {
  const navigate = useNavigate();
  const { signup ,authUser} = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    city: "",
    role:"",
  }); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    await signup(form);
    if(!authUser){
       if (form.role === "user") {
        navigate('/')
      } else if (form.role === "driver") {
        navigate('')
      } else if (form.role === "admin") {
        navigate('')
      }
    }
     
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
              Create Your Account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
                className="w-full border-b border-gray-300 focus:border-purple-500 bg-transparent outline-none py-2"
              />
            </div>

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

              {/* City and Role section  */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  required
                  className="w-full border-b border-gray-300 focus:border-purple-500 bg-transparent outline-none py-2"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 focus:border-purple-500 bg-transparent outline-none py-2"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="driver">Driver</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="tel"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create Password"
                required
                className="w-full border-b border-gray-300 focus:border-purple-500 bg-transparent outline-none py-2"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-purple-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-purple-700 transition"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Right - Cab Booking Themed Panel */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-black text-white p-10">
          <div className="max-w-sm text-center">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Ride <span className="text-purple-300">Anywhere</span>, Anytime
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Book your cab in just a few clicks. Fast, reliable, and
              comfortable rides at your service 24/7. Sign up today and travel
              stress-free.
            </p>
            <div className="h-1 w-16 bg-purple-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
