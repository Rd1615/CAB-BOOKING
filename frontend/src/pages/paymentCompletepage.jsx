import React from "react";
import { CheckCircle, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black p-6">
      <div className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-3xl max-w-lg w-full p-10 border border-white/20 text-center animate-fadeIn">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-400 animate-bounce" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-300 mb-6">
          Thank you for your payment. Your booking has been confirmed!
        </p>

        {/* Payment Info */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-700/20 border border-green-400 rounded-2xl p-5 mb-6 text-left">
          <p className="text-gray-300 text-sm">Transaction ID</p>
          <p className="text-white font-semibold">TXN123456789</p>
          <p className="text-gray-300 text-sm mt-3">Amount Paid</p>
          <p className="text-white font-semibold text-lg">₹ 1,101</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-900/50"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </button>

          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-green-900/50">
            <Download className="w-5 h-5" /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
