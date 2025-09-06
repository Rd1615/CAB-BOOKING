import React from "react";
import { Car, Calendar, IndianRupee, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CabReceiptPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // go to previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050b18] to-[#0a1428] text-gray-200 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-900/40 p-8 animate-fadeIn">
        
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-blue-900/50 backdrop-blur-md 
          text-blue-300 rounded-lg shadow-md hover:bg-blue-800/70 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Ride Receipt</h1>
          <span className="text-sm text-gray-400">Receipt ID: #RCPT12345</span>
        </div>

        {/* Trip Summary */}
        <div className="bg-white/5 rounded-2xl border border-blue-900/50 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Car className="w-6 h-6 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Trip Summary</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Pickup</p>
              <p className="font-semibold text-white">Bhavnagar, Gujarat</p>
            </div>
            <div>
              <p className="text-gray-400">Drop</p>
              <p className="font-semibold text-white">Surat, Gujarat</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400 col-span-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>23 Aug, 01:55 PM</span>
            </div>
          </div>
        </div>

        {/* Fare Details */}
        <div className="bg-white/5 rounded-2xl border border-blue-900/50 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <IndianRupee className="w-6 h-6 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Fare Details</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-400">Base Fare</p>
              <p className="text-white">₹9,500</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Taxes & Charges</p>
              <p className="text-white">₹450</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Discount (CABDEAL)</p>
              <p className="text-green-400">-₹300</p>
            </div>
            <div className="border-t border-blue-800/50 pt-2 flex justify-between font-semibold text-lg">
              <p className="text-white">Total Paid</p>
              <p className="text-green-400">₹9,650</p>
            </div>
          </div>
        </div>

        {/* Traveller Details */}
        <div className="bg-white/5 rounded-2xl border border-blue-900/50 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Traveller</h2>
          <p className="text-sm"><span className="text-gray-400">Name:</span> Rahul Chauhan</p>
          <p className="text-sm"><span className="text-gray-400">Mobile:</span> +91 98765 43210</p>
          <p className="text-sm"><span className="text-gray-400">Email:</span> rahul@example.com</p>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-900/50"
          >
            Home
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-green-900/50">
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
