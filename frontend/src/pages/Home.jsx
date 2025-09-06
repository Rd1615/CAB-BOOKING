import React, { useState, useEffect } from "react";
import Hs from "../img/hs.jpg";
import {
  MapPin,
  Calendar,
  Clock,
  Rocket,
  Plane,
  Timer,
  RefreshCcw,
  ArrowUp,
} from "lucide-react";
import Footer from "../components/Footer";
import GujaratPlaces from "../components/place";
import Services from "../components/OurService";
import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/useBookingStore";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tripOptions = [
  { key: "one_way", label: "One Way", icon: MapPin },
  { key: "round_trip", label: "Round Trip", icon: RefreshCcw },
  { key: "airport", label: "Airport", icon: Plane },
  { key: "hour", label: "Hourly", icon: Timer },
];

export default function RideEaseLanding() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("one_way");
  const [formData, setFormData] = useState(() => emptyForm("one_way"));
  const [loading, setLoading] = useState(false);
  const { setBookingDetail } = useBookingStore();
  const [rideType, setRideType] = useState("now");

  function emptyForm(tripType = "") {
    return {
      tripType,
      pickupLocation: "",
      dropLocation: "",
      pickupDate: "",
      returnDate: "",
      pickupTime: "",
      tripHour: "",
    };
  }

  // Reset form data when activeForm changes
  useEffect(() => {
    setFormData(emptyForm(activeForm));
  }, [activeForm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reusable swap function
  const swapLocations = () => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: prev.dropLocation || "",
      dropLocation: prev.pickupLocation,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example: pickup and drop locations should not be the same
    if (
      formData.pickupLocation.trim().toLowerCase() ===
      formData.dropLocation.trim().toLowerCase()
    ) {
      alert("Pickup and Drop locations cannot be the same.");
      return;
    }

    setLoading(true);
    try {
      await setBookingDetail({ ...formData, tripType: activeForm });
      setFormData(emptyForm(activeForm));
      console.log(formData);
      navigate("/car-search-result");
    } catch (error) {
      alert("Failed to book ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden font-poppins bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Hs}
            alt="City Skyline"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="inline-block">Premium</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                Ride Experience
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-md">
              Experience luxury transportation with our premium fleet. Safe,
              reliable, and always on time.
            </p>
          </div>

          {/* Right content Booking Form */}
          <div className="rounded-3xl p-8 backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg transition-transform duration-300 ">
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {tripOptions.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveForm(key)}
                  aria-pressed={activeForm === key}
                  className={`py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-400 ${
                    activeForm === key
                      ? "bg-purple-600 text-white shadow-lg scale-105"
                      : "bg-white/20 text-gray-200 hover:bg-white/30"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="space-y-6">
              {/* ONE WAY */}
              {activeForm === "one_way" && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Pickup & Drop with swap button */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                    {/* Pickup Location */}
                    <div className="relative">
                      <label htmlFor="pickupLocation" className="sr-only">
                        Pickup Location
                      </label>
                      <MapPin className="absolute left-4 top-4 text-purple-300 w-5 h-5" />
                      <input
                        id="pickupLocation"
                        type="text"
                        name="pickupLocation"
                        placeholder="Pickup Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl 
                                text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 
                                focus:bg-white/30 transition"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                      />
                    </div>

                    {/* Swap Button */}
                    <button
                      type="button"
                      aria-label="Swap pickup and drop locations"
                      title="Swap pickup and drop locations"
                      className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 
                              mx-auto sm:mx-0 w-10 h-10 rounded-full bg-white/30 border border-white/40 
                              backdrop-blur flex items-center justify-center hover:bg-white/50 transition shadow-md"
                      onClick={swapLocations}
                    >
                      <RefreshCcw className="w-5 h-5 text-white" />
                    </button>

                    {/* Drop Location */}
                    <div className="relative">
                      <label htmlFor="dropLocation" className="sr-only">
                        Drop Location
                      </label>
                      <MapPin className="absolute left-4 top-4 text-pink-300 w-5 h-5" />
                      <input
                        id="dropLocation"
                        type="text"
                        name="dropLocation"
                        placeholder="Drop Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl 
                                text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400 
                                focus:bg-white/30 transition"
                        value={formData.dropLocation}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Ride Type Toggle (Now & Schedule) */}
                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setRideType("now")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "now"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Now
                    </button>

                    <button
                      type="button"
                      onClick={() => setRideType("schedule")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "schedule"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Schedule
                    </button>
                  </div>

                  {/* Schedule Options */}
                  {rideType === "schedule" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Pickup Date */}

                      <div className="relative group">
                        <label
                          htmlFor="pickupDate"
                          className="block mb-2 text-sm font-medium text-white/80"
                        >
                          Pickup Date
                        </label>
                        <Calendar
                          className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-blue-300 w-5 h-5 
                                  transition-colors duration-300 group-focus-within:text-blue-500"
                        />
                        <DatePicker
                          id="pickupDate"
                          selected={
                            formData.pickupDate
                              ? new Date(formData.pickupDate)
                              : null
                          }
                          onChange={(date) => {
                            if (!date) return;

                            // Strip the time → keep only YYYY-MM-DD
                            const onlyDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            );

                            handleInputChange({
                              target: {
                                name: "pickupDate",
                                value: onlyDate.toISOString().split("T")[0],
                              },
                            });
                          }}
                          required
                          placeholderText="Select a date"
                          dateFormat="dd MMM yyyy"
                          minDate={new Date()} // prevent selecting past dates
                          aria-label="Pickup date"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                          popperClassName="z-50"
                          calendarClassName="rounded-2xl bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-900/60 backdrop-blur-2xl text-white shadow-[0_0_25px_rgba(0,0,255,0.2)] border border-blue-400/40 p-4"
                          dayClassName={(date) =>
                            "rounded-full transition-all cursor-pointer " +
                            "hover:bg-blue-500/80 hover:text-black " +
                            "focus:bg-blue-600 focus:text-white"
                          }
                        />
                      </div>

                      {/* Pickup Time */}
                      <div className="relative group">
                        <label
                          htmlFor="pickupTime"
                          className="block mb-2 text-sm font-medium text-white/80"
                        >
                          Pickup Time
                        </label>
                        <Clock
                          className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-blue-300 w-5 h-5 
                                  transition-colors duration-300 group-focus-within:text-blue-500"
                        />
                        <DatePicker
                          id="pickupTime"
                          selected={
                            formData.pickupTime
                              ? new Date(`1970-01-01T${formData.pickupTime}:00`)
                              : null
                          }
                          onChange={(time) => {
                            if (!time) return;

                            // Extract HH:mm format
                            const hours = time
                              .getHours()
                              .toString()
                              .padStart(2, "0");
                            const minutes = time
                              .getMinutes()
                              .toString()
                              .padStart(2, "0");
                            const formattedTime = `${hours}:${minutes}`;

                            handleInputChange({
                              target: {
                                name: "pickupTime",
                                value: formattedTime,
                              },
                            });
                          }}
                          required
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Select Time"
                          dateFormat="h:mm aa"
                          placeholderText="Select a time"
                          aria-label="Pickup time"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                              font-bold rounded-2xl hover:from-purple-500 hover:to-pink-500 transition 
                              transform ${
                                loading
                                  ? "cursor-not-allowed opacity-70"
                                  : "hover:scale-105"
                              } flex items-center justify-center gap-2 shadow-lg`}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      <Rocket className="w-5 h-5" />
                    )}
                    {loading ? "Booking..." : "Book One Way"}
                  </button>
                </form>
              )}

              {/* ROUND TRIP */}
              {activeForm === "round_trip" && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Pickup & Drop with swap */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                    <div className="relative">
                      <label htmlFor="pickupLocation" className="sr-only">
                        Pickup Location
                      </label>
                      <MapPin className="absolute left-4 top-4 text-purple-300 w-5 h-5" />
                      <input
                        id="pickupLocation"
                        type="text"
                        name="pickupLocation"
                        placeholder="Pickup Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                      />
                    </div>

                    <button
                      type="button"
                      aria-label="Swap pickup and drop locations"
                      title="Swap pickup and drop locations"
                      className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 mx-auto sm:mx-0 w-10 h-10 rounded-full bg-white/30 border border-white/40 backdrop-blur flex items-center justify-center hover:bg-white/50 transition shadow-md"
                      onClick={swapLocations}
                    >
                      <RefreshCcw className="w-5 h-5 text-white" />
                    </button>

                    <div className="relative">
                      <label htmlFor="dropLocation" className="sr-only">
                        Drop Location
                      </label>
                      <MapPin className="absolute left-4 top-4 text-pink-300 w-5 h-5" />
                      <input
                        id="dropLocation"
                        type="text"
                        name="dropLocation"
                        placeholder="Drop Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition"
                        value={formData.dropLocation}
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Ride Type Toggle (Now & Schedule) */}
                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setRideType("now")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "now"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Now
                    </button>

                    <button
                      type="button"
                      onClick={() => setRideType("schedule")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "schedule"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Schedule
                    </button>
                  </div>

                  {/* Schedule Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Return Date */}
                    <div className="relative group">
                      <label
                        htmlFor="returnDate"
                        className="block mb-2 text-sm font-medium text-white/80"
                      >
                        Return Date
                      </label>
                      <Calendar
                        className="absolute left-4 top-[3.2rem] -translate-y-1/2 w-5 h-5 
                                    text-blue-300 transition-colors duration-300 
                                    group-focus-within:text-blue-500"
                      />
                      <DatePicker
                        id="returnDate"
                        selected={
                          formData.returnDate
                            ? new Date(formData.returnDate)
                            : null
                        }
                        onChange={(date) => {
                          if (!date) return;
                          const onlyDate = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                          );
                          handleInputChange({
                            target: {
                              name: "returnDate",
                              value: onlyDate.toISOString().split("T")[0],
                            },
                          });
                        }}
                        required
                        placeholderText="Select a date"
                        dateFormat="dd MMM yyyy"
                        minDate={new Date()}
                        aria-label="Return date"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none  transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                        popperClassName="z-50"
                        calendarClassName="rounded-2xl bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-900/60 backdrop-blur-2xl text-white shadow-[0_0_25px_rgba(0,0,255,0.2)] border border-blue-400/40 p-4"
                        dayClassName={() => "rounded-full transition-all cursor-pointer hover:bg-blue-500/80 hover:text-black focus:bg-blue-600 focus:text-white"
                        }
                      />
                    </div>
                    {rideType === "schedule" && (
                      <>
                        {/* Pickup Date */}
                        <div className="relative group">
                          <label
                            htmlFor="pickupDate"
                            className="block mb-2 text-sm font-medium text-white/80"
                          >
                            Pickup Date
                          </label>
                          <Calendar
                            className="absolute left-4 top-[3.2rem] -translate-y-1/2 w-5 h-5 
                                        text-blue-300 transition-colors duration-300 
                                        group-focus-within:text-blue-500"
                          />
                          <DatePicker
                            id="pickupDate"
                            selected={
                              formData.pickupDate
                                ? new Date(formData.pickupDate)
                                : null
                            }
                            onChange={(date) => {
                              if (!date) return;
                              const onlyDate = new Date(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate()
                              );
                              handleInputChange({
                                target: {
                                  name: "pickupDate",
                                  value: onlyDate.toISOString().split("T")[0],
                                },
                              });
                            }}
                            required
                            placeholderText="Select a date"
                            dateFormat="dd MMM yyyy"
                            minDate={new Date()}
                            aria-label="Pickup date"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md 
                                        border border-white/20 rounded-2xl text-white placeholder-gray-300 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                                        transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                            popperClassName="z-50"
                            calendarClassName="rounded-2xl bg-gradient-to-br from-blue-900/60 via-blue-800/50 
                                                to-blue-900/60 backdrop-blur-2xl text-white shadow-[0_0_25px_rgba(0,0,255,0.2)] 
                                                border border-blue-400/40 p-4"
                            dayClassName={() =>
                              "rounded-full transition-all cursor-pointer hover:bg-blue-500/80 hover:text-black focus:bg-blue-600 focus:text-white"
                            }
                          />
                        </div>

                        {/* Pickup Time */}
                        <div className="relative group">
                          <label
                            htmlFor="pickupTime"
                            className="block mb-2 text-sm font-medium text-white/80"
                          >
                            Pickup Time
                          </label>
                          <Clock
                            className="absolute left-4 top-[3.2rem] -translate-y-1/2 w-5 h-5 
                                        text-blue-300 transition-colors duration-300 
                                        group-focus-within:text-blue-500"
                          />
                          <DatePicker
                            id="pickupTime"
                            selected={
                              formData.pickupTime
                                ? new Date(
                                    `1970-01-01T${formData.pickupTime}:00`
                                  )
                                : null
                            }
                            onChange={(time) => {
                              if (!time) return;
                              const hours = time
                                .getHours()
                                .toString()
                                .padStart(2, "0");
                              const minutes = time
                                .getMinutes()
                                .toString()
                                .padStart(2, "0");
                              handleInputChange({
                                target: {
                                  name: "pickupTime",
                                  value: `${hours}:${minutes}`,
                                },
                              });
                            }}
                            required
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            dateFormat="h:mm aa"
                            placeholderText="Select a time"
                            aria-label="Pickup time"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md 
                                        border border-white/20 rounded-2xl text-white placeholder-gray-300 
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                                        transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl hover:from-yellow-300 hover:to-orange-400 transition transform ${
                      loading
                        ? "cursor-not-allowed opacity-70"
                        : "hover:scale-105"
                    } flex items-center justify-center gap-2 shadow-lg`}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      <RefreshCcw className="w-5 h-5" />
                    )}
                    {loading ? "Booking..." : "Book Round Trip"}
                  </button>
                </form>
              )}

              {/* AIRPORT */}
              {activeForm === "airport" && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-purple-300 w-5 h-5" />
                      <input
                        type="text"
                        name="pickupLocation"
                        placeholder="Pickup Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      aria-label="Swap pickup & airport"
                      className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 mx-auto sm:mx-0 w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center hover:bg-white/30 transition"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          pickupLocation: prev.dropLocation,
                          dropLocation: prev.pickupLocation,
                        }))
                      }
                    >
                      <RefreshCcw className="w-4 h-4 text-white" />
                    </button>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-blue-300 w-5 h-5" />
                      <input
                        type="text"
                        name="dropLocation"
                        placeholder="Drop Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300"
                        value={formData.dropLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Date/Time */}
                  {/* Ride Type Toggle (Now & Schedule) */}
                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setRideType("now")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "now"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Now
                    </button>

                    <button
                      type="button"
                      onClick={() => setRideType("schedule")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "schedule"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Schedule
                    </button>
                  </div>

                  {/* Schedule Options */}
                  {rideType === "schedule" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Pickup Date */}

                      <div className="relative group">
                        <label
                          htmlFor="pickupDate"
                          className="block mb-2 text-sm font-medium text-white/80"
                        >
                          Pickup Date
                        </label>
                        <Calendar
                          className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-blue-300 w-5 h-5 
                                  transition-colors duration-300 group-focus-within:text-blue-500"
                        />
                        <DatePicker
                          id="pickupDate"
                          selected={
                            formData.pickupDate
                              ? new Date(formData.pickupDate)
                              : null
                          }
                          onChange={(date) => {
                            if (!date) return;

                            // Strip the time → keep only YYYY-MM-DD
                            const onlyDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            );

                            handleInputChange({
                              target: {
                                name: "pickupDate",
                                value: onlyDate.toISOString().split("T")[0],
                              },
                            });
                          }}
                          required
                          placeholderText="Select a date"
                          dateFormat="dd MMM yyyy"
                          minDate={new Date()} // prevent selecting past dates
                          aria-label="Pickup date"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                          popperClassName="z-50"
                          calendarClassName="rounded-2xl bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-900/60 backdrop-blur-2xl text-white shadow-[0_0_25px_rgba(0,0,255,0.2)] border border-blue-400/40 p-4"
                          dayClassName={(date) =>
                            "rounded-full transition-all cursor-pointer " +
                            "hover:bg-blue-500/80 hover:text-black " +
                            "focus:bg-blue-600 focus:text-white"
                          }
                        />
                      </div>

                      {/* Pickup Time */}
                      <div className="relative group">
                        <label
                          htmlFor="pickupTime"
                          className="block mb-2 text-sm font-medium text-white/80"
                        >
                          Pickup Time
                        </label>
                        <Clock
                          className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-blue-300 w-5 h-5 
                                  transition-colors duration-300 group-focus-within:text-blue-500"
                        />
                        <DatePicker
                          id="pickupTime"
                          selected={
                            formData.pickupTime
                              ? new Date(`1970-01-01T${formData.pickupTime}:00`)
                              : null
                          }
                          onChange={(time) => {
                            if (!time) return;

                            // Extract HH:mm format
                            const hours = time
                              .getHours()
                              .toString()
                              .padStart(2, "0");
                            const minutes = time
                              .getMinutes()
                              .toString()
                              .padStart(2, "0");
                            const formattedTime = `${hours}:${minutes}`;

                            handleInputChange({
                              target: {
                                name: "pickupTime",
                                value: formattedTime,
                              },
                            });
                          }}
                          required
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Select Time"
                          dateFormat="h:mm aa"
                          placeholderText="Select a time"
                          aria-label="Pickup time"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-blue-400 hover:to-cyan-400 transition transform hover:scale-105 flex items-center justify-center"
                  >
                    <Plane className="mr-2 w-5 h-5" />
                    Book Airport Ride
                  </button>
                </form>
              )}

              {/* HOURLY */}
              {activeForm === "hour" && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Pickup & Hours with swap button */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-purple-300 w-5 h-5" />
                      <input
                        type="text"
                        name="pickupLocation"
                        placeholder="Pickup Location"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      aria-label="Swap pickup & hours"
                      className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 mx-auto sm:mx-0 w-10 h-10 rounded-full bg-white/20 border border-white/30 backdrop-blur flex items-center justify-center hover:bg-white/30 transition"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          pickupLocation: prev.dropLocation || "",
                          dropLocation: prev.pickupLocation,
                        }))
                      }
                    >
                      <RefreshCcw className="w-4 h-4 text-white" />
                    </button>

                    <div className="relative">
                      <Timer className="absolute left-4 top-4 text-pink-300 w-5 h-5" />
                      <input
                        type="number"
                        name="tripHour"
                        placeholder="Hours (e.g. 3)"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300"
                        value={formData.tripHour}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  {/* Ride Type Toggle (Now & Schedule) */}
                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setRideType("now")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "now"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Now
                    </button>

                    <button
                      type="button"
                      onClick={() => setRideType("schedule")}
                      className={`flex-1 py-3 font-semibold transition-all duration-300 border-b-2 
                        ${
                          rideType === "schedule"
                            ? "border-purple-500 text-purple-400"
                            : "border-transparent text-gray-400 hover:text-purple-300"
                        }`}
                    >
                      Schedule
                    </button>
                  </div>

                  {/* Schedule Options */}
                  {rideType === "schedule" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Pickup Date */}

                      <div className="relative group">
                        <label
                          htmlFor="pickupDate"
                          className="block mb-2 text-sm font-medium text-white/80"
                        >
                          Pickup Date
                        </label>
                        <Calendar
                          className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-blue-300 w-5 h-5 
                                  transition-colors duration-300 group-focus-within:text-blue-500"
                        />
                        <DatePicker
                          id="pickupDate"
                          selected={
                            formData.pickupDate
                              ? new Date(formData.pickupDate)
                              : null
                          }
                          onChange={(date) => {
                            if (!date) return;

                            // Strip the time → keep only YYYY-MM-DD
                            const onlyDate = new Date(
                              date.getFullYear(),
                              date.getMonth(),
                              date.getDate()
                            );

                            handleInputChange({
                              target: {
                                name: "pickupDate",
                                value: onlyDate.toISOString().split("T")[0],
                              },
                            });
                          }}
                          required
                          placeholderText="Select a date"
                          dateFormat="dd MMM yyyy"
                          minDate={new Date()} // prevent selecting past dates
                          aria-label="Pickup date"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                          popperClassName="z-50"
                          calendarClassName="rounded-2xl bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-blue-900/60 backdrop-blur-2xl text-white shadow-[0_0_25px_rgba(0,0,255,0.2)] border border-blue-400/40 p-4"
                          dayClassName={(date) =>
                            "rounded-full transition-all cursor-pointer " +
                            "hover:bg-blue-500/80 hover:text-black " +
                            "focus:bg-blue-600 focus:text-white"
                          }
                        />
                      </div>

                      {/* Pickup Time */}
                      <div className="relative group">
                        <label
                          htmlFor="pickupTime"
                          className="block mb-2 text-sm font-medium text-white/80"
                        >
                          Pickup Time
                        </label>
                        <Clock
                          className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-blue-300 w-5 h-5 
                                  transition-colors duration-300 group-focus-within:text-blue-500"
                        />
                        <DatePicker
                          id="pickupTime"
                          selected={
                            formData.pickupTime
                              ? new Date(`1970-01-01T${formData.pickupTime}:00`)
                              : null
                          }
                          onChange={(time) => {
                            if (!time) return;

                            // Extract HH:mm format
                            const hours = time
                              .getHours()
                              .toString()
                              .padStart(2, "0");
                            const minutes = time
                              .getMinutes()
                              .toString()
                              .padStart(2, "0");
                            const formattedTime = `${hours}:${minutes}`;

                            handleInputChange({
                              target: {
                                name: "pickupTime",
                                value: formattedTime,
                              },
                            });
                          }}
                          required
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Select Time"
                          dateFormat="h:mm aa"
                          placeholderText="Select a time"
                          aria-label="Pickup time"
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white/20 hover:border-blue-300"
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-2xl shadow-md hover:from-green-400 hover:to-teal-400 transition transform hover:scale-105 flex items-center justify-center"
                  >
                    <Timer className="mr-2 w-5 h-5" />
                    Book Hourly Ride
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <GujaratPlaces />
      <Services />
      <WhyChooseUs />
      <Footer />
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg px-4 py-3 rounded-full flex items-center gap-2 hover:scale-110 hover:shadow-blue-500/50 transition"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
