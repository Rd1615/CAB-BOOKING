import React, { useState } from "react";
import {
  Briefcase,
  XCircle,
  CheckSquare,
  User,
  Car,
  Phone,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const bookings = {
    upcoming: [
      {
        id: 1,
        driver: "Ramesh Patel",
        car: "Toyota Innova",
        type: "SUV",
        carNumber: "GJ01 AB 1234",
        driverNumber: "+91 98765 43210",
        pickupDate: "25 Aug 2025",
        pickupTime: "10:30 AM",
        tripType: "One Way",
        from: "Ahmedabad",
        to: "Vadodara",
        price: "₹1800",
      },
      {
        id: 2,
        driver: "Suresh Patel",
        car: "Toyota Innova",
        type: "SUV",
        carNumber: "GJ01 AB 5678",
        driverNumber: "+91 99999 88888",
        pickupDate: "27 Aug 2025",
        pickupTime: "01:00 PM",
        tripType: "Round Trip",
        from: "Ahmedabad",
        to: "Surat",
        price: "₹2500",
      },
    ],
    cancelled: [],
    completed: [
      {
        id: 3,
        driver: "Amit Sharma",
        car: "Hyundai Aura",
        type: "Sedan",
        carNumber: "GJ05 XY 5678",
        driverNumber: "+91 91234 56789",
        pickupDate: "10 Aug 2025",
        pickupTime: "08:00 AM",
        tripType: "Round Trip",
        from: "Surat",
        to: "Mumbai",
        price: "₹3500",
      },
    ],
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-gray-100">
      <Navbar />

      <div className="pt-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto rounded-2xl shadow-xl backdrop-blur-md bg-blue-900/30 border border-white/10 p-6">
          {/* ✅ Back Button */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-900/50 backdrop-blur-md 
            text-blue-300 rounded-lg shadow-md hover:bg-blue-800/70 transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-white/10">
            {[
              { key: "upcoming", label: "Upcoming", icon: Briefcase },
              { key: "cancelled", label: "Cancelled", icon: XCircle },
              { key: "completed", label: "Completed", icon: CheckSquare },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 md:px-8 py-3 text-sm font-medium transition-all duration-300 
                ${
                  activeTab === tab.key
                    ? "border-b-4 border-blue-400 text-blue-400 bg-blue-800/30 backdrop-blur-sm"
                    : "text-gray-300 hover:text-blue-300"
                }`}
              >
                <tab.icon className="w-5 h-5" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {bookings[activeTab].length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
                  alt="empty"
                  className="w-20 h-20 md:w-24 md:h-24 mb-6 opacity-70 animate-pulse"
                />
                <p className="text-gray-300 text-lg font-medium">
                  No {activeTab} bookings found
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  When you book a trip, you will see your itinerary here.
                </p>
                <Link to="/" className="mt-6 px-6 md:px-8 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md hover:scale-105 hover:shadow-blue-500/40 transition">
                  Plan a Trip
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings[activeTab].map((b) => (
                  <div
                    key={b.id}
                    className="rounded-xl p-5 md:p-6 bg-blue-900/30 backdrop-blur-md border border-white/10 shadow-md hover:shadow-blue-500/30 transition transform hover:scale-[1.01]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left */}
                      <div className="space-y-3 text-gray-200">
                        <p className="flex items-center gap-2 font-medium">
                          <User className="w-4 h-4 text-blue-400" /> Driver:{" "}
                          <span className="font-semibold">{b.driver}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-blue-400" /> Car: {b.car}{" "}
                          ({b.type})
                        </p>
                        <p className="flex items-center gap-2">🚖 {b.carNumber}</p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-400" />{" "}
                          {b.driverNumber}
                        </p>
                      </div>

                      {/* Right */}
                      <div className="space-y-3 text-gray-200">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />{" "}
                          {b.pickupDate}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />{" "}
                          {b.pickupTime}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400" /> {b.from} →{" "}
                          {b.to}
                        </p>
                        <p className="flex items-center gap-2 font-semibold text-green-400">
                          <DollarSign className="w-4 h-4" /> {b.price}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex flex-col md:flex-row justify-between text-xs md:text-sm text-gray-400 gap-2">
                      <span>Trip Type: {b.tripType}</span>
                      <span>ID: #{b.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
