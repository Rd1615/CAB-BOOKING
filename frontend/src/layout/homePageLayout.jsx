// Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {


  return (
    <div className="min-h-screen ">
      {/* Navbar */}
        <Navbar/>

      {/* Main content */}
      <main className="flex-1 pt-16 px-4">{children}</main>

      {/* Footer */}
        <Footer/>
    </div>
  );
}
