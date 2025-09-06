import React from "react";
import {
  Clock,
  Shield,
  DollarSign,
  Star,
} from "lucide-react";
import WhyChooseusImg from "../img/Hero_img_2.svg";

export default function WhyChooseUs() {
    const ChooseUsDetails = [
                {
                  icon: Shield,
                  title: "Safety First",
                  desc: "All our drivers are vetted and vehicles inspected regularly.",
                },
                {
                  icon: DollarSign,
                  title: "Transparent Pricing",
                  desc: "No hidden fees or surge pricing.",
                },
                {
                  icon: Clock,
                  title: "24/7 Available",
                  desc: "Round-the-clock service for all your needs.",
                },
                {
                  icon: Star,
                  title: "Premium Experience",
                  desc: "Luxury vehicles and exceptional service.",
                },
              ]
  return (
    <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Why Choose RideEase?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the difference with our premium service standards
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {ChooseUsDetails.map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <img
                src={WhyChooseusImg}
                alt="Chauffeur"
                className="w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
  );
}
