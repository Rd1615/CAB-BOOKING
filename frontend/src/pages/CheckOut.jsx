import React, { useState } from "react";
import {
  Calendar,
  Car,
  MapPin,
  Ticket,
  CreditCard,
  Smartphone,
  ArrowLeft,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CabCheckoutPage() {
  const [paymentOption, setPaymentOption] = useState("fullpay");
  const [coupon, setCoupon] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("CABDEAL");

  const navigate = useNavigate();

  const handlepayment = () => {
    if(paymentOption === "fullPay") return navigate("/payment");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b18] to-[#0a1428] text-gray-200 flex justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 hover:text-white bg-[#132347]/70 hover:bg-[#1a2b4d] border border-blue-800 rounded-lg transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Trip Details */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-blue-900/40 animate-slideDown">
            <div className="flex items-center px-6 py-4 border-b border-blue-800/50 bg-blue-900/10 rounded-t-2xl">
              <MapPin className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-lg font-semibold text-white">
                Outstation One Way Trip
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="font-bold text-white">Bhavnagar, Gujarat, India</p>
              <p className="text-gray-400">Surat, Gujarat, India</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={16} className="text-blue-400" />
                <span>23 Aug, 01:55 PM</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-800/50">
                <div>
                  <p className="font-semibold text-white">Indica, Swift</p>
                  <p className="text-gray-400 text-sm">4 Seats • AC</p>
                </div>
                <Car className="text-blue-400 drop-shadow-lg" size={50} />
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-blue-900/40 p-6 animate-slideDown">
            <h3 className="text-md font-semibold mb-3 text-white">
              Inclusions & Exclusions
            </h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>✅ Toll Charges, Parking, State Tax & Driver Allowance included</li>
              <li>✅ One Pickup and Drop only</li>
              <li>✅ 148 Kms included. ₹29.8/Km beyond that</li>
              <li>✅ Free cancellation till <b>1 hr before ride</b></li>
            </ul>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-blue-900/40 p-6 animate-slideDown">
            <h3 className="text-md font-semibold mb-3 text-white">
              Cancellation Policy
            </h3>
            <p className="text-sm text-gray-400">
              Free cancellation until <b>12:55 PM, Sat 23 Aug</b> (1 hr before pickup)
            </p>
          </div>

          {/* Traveller Details */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-blue-900/40 p-6 space-y-4 animate-slideDown">
            <h3 className="text-md font-semibold text-white">Traveller Details</h3>
            <input
              type="text"
              placeholder="Enter Pickup Location"
              className="w-full border border-blue-800/50 bg-[#0d1f3a]/70 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/80 focus:outline-none transition"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-blue-800/50 bg-[#0d1f3a]/70 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/80"
              />
              <select className="border border-blue-800/50 bg-[#0d1f3a]/70 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500/80">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Mobile No."
                className="border border-blue-800/50 bg-[#0d1f3a]/70 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/80"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="border border-blue-800/50 bg-[#0d1f3a]/70 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/80"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Coupons */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-blue-900/40 p-6 animate-slideDown">
            <div className="flex items-center mb-4">
              <Ticket className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-md font-semibold text-white">Coupon & Offers</h3>
            </div>
            {["CABDEAL", "WELCOMEMMT", "CABOFFER"].map((code) => (
              <label
                key={code}
                className={`flex items-center justify-between border rounded-lg p-3 mb-3 cursor-pointer transition-all ${
                  selectedCoupon === code
                    ? "border-blue-500/80 bg-blue-900/30 shadow-lg shadow-blue-500/20 scale-[1.01]"
                    : "border-blue-800/50 hover:bg-blue-900/20"
                }`}
              >
                <div>
                  <p className="font-bold text-blue-400">{code}</p>
                  <p className="text-sm text-gray-400">
                    {code === "CABDEAL" && "₹300 Discount Applied"}
                    {code === "WELCOMEMMT" && "₹200 Instant Discount"}
                    {code === "CABOFFER" && "₹100 off (limited time)"}
                  </p>
                </div>
                <input
                  type="radio"
                  checked={selectedCoupon === code}
                  onChange={() => setSelectedCoupon(code)}
                />
              </label>
            ))}
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Enter a Coupon"
                className="flex-1 border border-blue-800/50 bg-[#0d1f3a]/70 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500/80 focus:outline-none"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/40 transition text-white font-semibold px-4 py-3 rounded-lg">
                Apply
              </button>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-[#132347]/95 rounded-2xl shadow-xl border border-blue-900 p-6 space-y-5 animate-slideDown">
            <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" /> Payment Options
            </h3>

            {[
              {
                id: "fullPay",
                title: "Full Pay",
                desc: "Pay complete amount now & confirm instantly",
                amount: "₹9,950",
                icon: <CreditCard className="w-6 h-6 text-blue-400" />,
              },
              {
                id: "payLater",
                title: "Pay Later",
                desc: "Reserve your ride, pay before trip starts",
                amount: "₹9,950",
                icon: <IndianRupee className="w-6 h-6 text-blue-400" />,
              },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition-all ${
                  paymentOption === option.id
                    ? "border-blue-500 bg-[#1a2b4d] shadow-lg shadow-blue-900/40 scale-[1.02]"
                    : "border-blue-800 hover:bg-[#0f1e3a]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <div>
                    <p className="font-bold text-white">{option.title}</p>
                    <p className="text-sm text-gray-400">{option.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-green-400">{option.amount}</p>
                  <input
                    type="radio"
                    checked={paymentOption === option.id}
                    onChange={() => setPaymentOption(option.id)}
                  />
                </div>
              </label>
            ))}

            {/* Enhanced Pay Button */}
            <button on onClick={handlepayment} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-600/30 text-white font-semibold py-3 rounded-xl transition-all">
              🚖 Pay & Confirm Ride
            </button>

            {/* Secure Note */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-2">
              <ShieldCheck size={14} className="text-green-400" />
              100% Secure Payment Gateway
            </div>

            <button className="w-full text-blue-400 text-sm font-medium mt-3 hover:underline">
              View Fare Breakup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
