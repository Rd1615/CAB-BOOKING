import React, { useState } from "react";
import { Car, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import DistanceMatrix from "./mapDemo";
import { useBookingStore } from "../store/useBookingStore";

const cars = [
  {
    name: "Indica, Swift",
    cabType: "HATCHBACK", // ✅ added
    rating: 4.7,
    fuel: "CNG",
    seats: 4,
    ac: true,
    price: 4438,
    tax: 685,
    originalPrice: 5192,
    discount: 15,
  },
  {
    name: "Indica, Swift",
    cabType: "SEDAN", // ✅ added
    rating: 4.3,
    fuel: "Diesel",
    seats: 4,
    ac: true,
    price: 4839,
    tax: 705,
    originalPrice: 5656,
    discount: 14,
  },
  {
    name: "Dzire, Etios",
    cabType: "SEDAN", // ✅ added
    rating: 4.5,
    fuel: "Diesel",
    seats: 4,
    ac: true,
    price: 4641,
    tax: 731,
    originalPrice: 5462,
    discount: 15,
  },
  {
    name: "Innova Crysta",
    cabType: "SUV", // ✅ added
    rating: 4.6,
    fuel: "Diesel",
    seats: 6,
    ac: true,
    price: 5641,
    tax: 800,
    originalPrice: 6462,
    discount: 12,
  },
  {
    name: "Toyota Innova",
    cabType: "SUV", // ✅ added
    rating: 4.4,
    fuel: "Diesel",
    seats: 7,
    ac: true,
    price: 6041,
    tax: 900,
    originalPrice: 7000,
    discount: 14,
  },
];

export default function CarSearchResults() {

  const {bookingDetail} = useBookingStore();

  const [filters, setFilters] = useState({
    cabType: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const list = prev[category];
      if (list.includes(value)) {
        return { ...prev, [category]: list.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...list, value] };
      }
    });
  };

  const goBack = () => {
    window.history.back();
  };

  // ✅ Filter cars before rendering
  const filteredCars = cars.filter((car) =>
    filters.cabType.length > 0 ? filters.cabType.includes(car.cabType) : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-gray-100">
      <Navbar />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-900/50 backdrop-blur-md 
          text-blue-300 rounded-lg shadow-md hover:bg-blue-800/70 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Trip Details And Car Type */}
          <div className="lg:w-1/4">
            {/* Mobile Toggle */}
            <button
              className="lg:hidden w-full px-4 py-2 mb-4 bg-blue-900/40 rounded-lg text-blue-300 font-semibold shadow-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Details ▲" : "Show Details ▼"}
            </button>

            {/* Trip Details Panel */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } lg:block bg-blue-900/30 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl space-y-6`}
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Trip Details
              </h2>

              {/* From / To */}
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-blue-800/30 border border-white/10">
                  <p className="text-sm text-gray-400">From</p>
                  <p className="text-lg font-semibold text-gray-100">
                    {bookingDetail.pickupLocation}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-800/30 border border-white/10">
                  <p className="text-sm text-gray-400">To</p>
                  <p className="text-lg font-semibold text-gray-100">{bookingDetail.dropLocation}</p>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-blue-800/50" />

              {/* Car Type with checkboxes */}
              <div>
                <h3 className="font-semibold mb-3 text-blue-300">Car Type</h3>
                <div className="space-y-2">
                  {["HATCHBACK", "SEDAN", "SUV"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400"
                        checked={filters.cabType.includes(type)}
                        onChange={() => handleFilterChange("cabType", type)}
                      />
                      <span className="text-gray-200">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Car List */}
          <div className="lg:w-3/4 space-y-6 overflow-y-auto pr-2 max-h-[calc(100vh-8rem)]">
            {/* Map on Top - Fixed */}
            <div
              className="sticky top-0 z-20 mb-6 h-[170px] lg:h-[250px] 
                  bg-blue-900/20 rounded-2xl shadow-xl backdrop-blur-md border border-white/10"
            >
              <div className="h-full w-full rounded-2xl overflow-hidden">
                <iframe
                  title="Map"
                  className="w-full h-full border-0 rounded-2xl"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.5946%2C12.9716%2C77.5946%2C12.9716&layer=mapnik"
                  allowFullScreen
                ></iframe>
                {/* <DistanceMatrix/> */}
              </div>
            </div>

            {filteredCars.map((car, idx) => (
              <div
                key={idx}
                className="bg-blue-900/30 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl 
                 flex flex-col sm:flex-row justify-between sm:items-center gap-4 
                 hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="flex gap-4 items-center">
                  <div className="bg-blue-800/40 p-4 rounded-xl">
                    <Car size={48} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl">{car.name}</h3>
                    <p className="text-green-400 font-semibold">{car.fuel}</p>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {car.seats} Seats • {car.ac ? "AC" : "Non-AC"}
                    </p>
                    <p className="text-sm text-yellow-400">
                      Rating: {car.rating} ★
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 line-through text-sm">
                    ₹{car.originalPrice}
                  </p>
                  <p className="text-green-400 font-bold text-lg sm:text-xl">
                    ₹{car.price}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    + ₹{car.tax} Taxes & Charges
                  </p>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 
                               rounded-lg shadow-md font-semibold text-sm sm:text-base w-full sm:w-auto"
                  >
                    SELECT CAB
                  </button>
                </div>
              </div>
            ))}

            {filteredCars.length === 0 && (
              <p className="text-center text-gray-400 italic">
                No cars available for the selected filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
