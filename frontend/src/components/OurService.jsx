import React from "react";
import {
  Plane,
  CalendarDays,
  Building,
  Timer
} from "lucide-react";

export default function Services() {
  const services = [
  {
    icon: Building,
    title: "City Rides",
    desc: "Quick and convenient transportation within the city",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    desc: "Reliable airport pickup and drop-off services",
    gradient: "from-green-400 to-teal-500",
  },
  {
    icon: CalendarDays,
    title: "Scheduled Rides",
    desc: "Book rides in advance for important events",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Timer,
    title: "Hourly Rental",
    desc: "Flexible hourly rental options for your convenience",
    gradient: "from-pink-400 to-purple-500",
  },
];
  return (
    <section
        id="services"
        className="py-20 bg-gradient-to-r from-purple-600 to-pink-500"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
              Comprehensive transportation solutions for every need
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 
                         rounded-2xl p-8 text-center transition transform 
                         hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon with gradient circle */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.gradient} 
                           rounded-full flex items-center justify-center 
                           mx-auto mb-6 shadow-lg`}
                >
                  <service.icon className="text-white w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/80">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
