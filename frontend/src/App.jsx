import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import React,{useEffect} from "react";
import { useAuthStore } from "./store/useAuthStore";


// Import page 
import RideEaseLanding from "./pages/Home";
import ForgotPassword from "./pages/forgot-password";
import Booking from "./pages/Booking";
import CarSearchResult from "./pages/CarSearchResult";
import Payment from "./pages/payment";
import CabCheckoutPage from "./pages/CheckOut";
import PaymentComplete from "./pages/paymentCompletepage";
import CabReceiptPage from "./pages/receipt";

function App() {

  const {checkAuth} = useAuthStore();

   // Run checkAuth when app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    // <Layout>
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RideEaseLanding/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/car-search-result" element={<CarSearchResult/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/checkout" element={<CabCheckoutPage/>}/>
          <Route path="/payment-complete" element={<PaymentComplete/>}/>
          <Route path="/cab-receipt" element={<CabReceiptPage/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
    //  </Layout>
  )
}

export default App;
