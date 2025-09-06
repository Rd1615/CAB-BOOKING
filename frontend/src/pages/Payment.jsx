import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Landmark,
  Info,
  QrCode,
  AtSign,
  ArrowLeft,
} from "lucide-react";

export default function Payment() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-black flex items-center justify-center p-6">
      <div className="backdrop-blur-2xl bg-white/10 shadow-2xl rounded-3xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 overflow-hidden border border-white/20">
        {/* Left Section */}
        <div className="md:col-span-2 p-8 space-y-8">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          {/* Trip Info */}
          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-2xl transition">
            <h2 className="text-xl font-bold text-white">
              Jewels Circle, Vij.. → Surat, Gujarat
            </h2>
            <p className="text-gray-300">Oneway Outstation • HATCHBACK</p>
            <p className="text-sm text-gray-400">
              Pickup on: 22 Aug'25, Fri, 07:05 PM
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-200">
                <User className="w-4 h-4 mr-2 text-blue-300" /> Rahul Chauhan
                (Primary)
              </div>
              <div className="flex items-center text-sm text-gray-200">
                <Mail className="w-4 h-4 mr-2 text-blue-300" />{" "}
                rahulchauhan1615@gmail.com
              </div>
              <div className="flex items-center text-sm text-gray-200">
                <Phone className="w-4 h-4 mr-2 text-blue-300" /> +91-7226882842
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Choose Payment Method
            </h3>
            <div className="space-y-4">
              {/* UPI Option */}
              <div
                onClick={() =>
                  setSelectedPayment(selectedPayment === "upi" ? null : "upi")
                }
                className={`flex items-center p-5 rounded-2xl cursor-pointer transition transform hover:scale-[1.02] ${
                  selectedPayment === "upi"
                    ? "bg-gradient-to-r from-green-400/30 to-green-600/30 border border-green-400"
                    : "bg-white/10 border border-white/20 hover:bg-white/20"
                }`}
              >
                <Landmark className="w-6 h-6 text-green-400 mr-3" />
                <span className="text-gray-200 font-medium">
                  UPI - GPay, PhonePe, Paytm
                </span>
              </div>

              {/* UPI Payment Form */}
              {selectedPayment === "upi" && (
                <div className="mt-6 bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-black/30 border border-green-400/30 shadow-2xl rounded-3xl animate-slideDown backdrop-blur-xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center px-6 py-4 border-b border-white/20 bg-white/5 backdrop-blur-md rounded-t-3xl">
                    <QrCode className="w-8 h-8 text-green-400 mr-3" />
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Pay with UPI
                      </h2>
                      <p className="text-sm text-gray-300">
                        Supports GPay, PhonePe, Paytm, BHIM
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="p-6 space-y-6 text-white">
                    {/* QR Code */}
                    <div className="text-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay"
                        alt="QR Code"
                        className="w-44 h-44 mx-auto rounded-xl shadow-md border border-white/30"
                      />
                      <p className="mt-3 text-sm text-gray-400">
                        Scan this QR to pay instantly
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray-600"></div>
                      <span className="mx-3 text-gray-400 text-sm font-semibold">
                        OR
                      </span>
                      <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    {/* Enter UPI ID */}
                    <div>
                      <h3 className="text-md font-semibold mb-2 flex items-center">
                        <AtSign className="w-5 h-5 text-green-400 mr-2" /> Enter
                        your UPI ID
                      </h3>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-green-500 focus:outline-none backdrop-blur-md"
                      />
                      <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-green-900/50">
                        Send Payment Request
                      </button>
                    </div>

                    {/* Supported Apps */}
                    <div className="pt-4 border-t border-white/20 text-center">
                      <p className="text-sm text-gray-400 mb-2">
                        Works with all major UPI apps
                      </p>
                      <div className="flex justify-center space-x-6">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Google_Pay_%28GPay%29_Logo.svg"
                          alt="GPay"
                          className="h-6"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Paytm_Logo.png"
                          alt="Paytm"
                          className="h-6"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/PhonePe_Logo.svg"
                          alt="PhonePe"
                          className="h-6"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/3/3f/BHIM_UPI_logo.svg"
                          alt="BHIM"
                          className="h-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Option */}
              <div
                onClick={() =>
                  setSelectedPayment(selectedPayment === "card" ? null : "card")
                }
                className={`flex items-center p-5 rounded-2xl cursor-pointer transition transform hover:scale-[1.02] ${
                  selectedPayment === "card"
                    ? "bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 border border-yellow-400"
                    : "bg-white/10 border border-white/20 hover:bg-white/20"
                }`}
              >
                <CreditCard className="w-6 h-6 text-yellow-400 mr-3" />
                <span className="text-gray-200 font-medium">
                  Credit & Debit Cards - Visa, Mastercard, Amex
                </span>
              </div>

              {/* Card Payment Form */}
              {selectedPayment === "card" && (
                <div className="mt-6 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-black/30 border border-blue-400/30 shadow-2xl rounded-3xl animate-slideDown backdrop-blur-xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center px-6 py-4 border-b border-white/20 bg-white/5 backdrop-blur-md rounded-t-3xl">
                    <CreditCard className="w-8 h-8 text-blue-400 mr-3" />
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Pay with Card
                      </h2>
                      <p className="text-sm text-gray-300">
                        Supports all domestic & international cards
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="p-6 space-y-5 text-white">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none backdrop-blur-md"
                    />

                    <div className="grid grid-cols-4 gap-3">
                      <select className="col-span-1 bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 backdrop-blur-md">
                        <option>MM</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1}>
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>

                      <select className="col-span-1 bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 backdrop-blur-md">
                        <option>YY</option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i}>{2025 + i}</option>
                        ))}
                      </select>

                      <div className="col-span-2 flex items-center bg-white/10 border border-white/20 rounded-xl px-3 backdrop-blur-md">
                        <input
                          type="password"
                          placeholder="CVV"
                          className="w-full py-3 bg-transparent placeholder-gray-400 text-white focus:outline-none"
                          maxLength={4}
                        />
                        <Info className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-900/50">
                      Pay Securely
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white/5 p-8 border-l border-white/20 space-y-6">
          {/* Fare Info */}
          <div className="bg-gradient-to-r from-green-500/30 to-green-600/30 border border-green-400 rounded-2xl p-6 shadow-md text-center">
            <h3 className="text-lg font-semibold text-white">Total Due</h3>
            <p className="text-4xl font-extrabold text-green-300 mt-2">₹ 1,101</p>
            <p className="text-gray-200 text-sm">Fare: ₹ 1,101</p>
          </div>
        </div>
      </div>
    </div>
  );
}
