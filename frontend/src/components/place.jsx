import React from "react";
import { Check } from "lucide-react";
import S_Unity from "../img/Stachu_unity.jpg";
import Somnath from "../img/somnath.jpg";
import Gir_poster from "../img/gir.webp";

export default function GujaratPlaces() {
  const places = [
    {
      name: "Somnath Temple",
      desc: "One of the 12 Jyotirlinga shrines of Lord Shiva, a spiritual landmark.",
      img: Somnath,
      features: ["Spiritual heritage", "Sea-facing temple", "Rich history"],
      buttonColor: "from-blue-500 to-purple-500",
    },
    {
      name: "Statue of Unity",
      desc: "World’s tallest statue dedicated to Sardar Vallabhbhai Patel.",
      img: S_Unity,
      features: ["182 meters tall", "Museum & exhibitions", "Viewing gallery"],
      buttonColor: "from-yellow-400 to-orange-500",
      popular: true,
    },
    {
      name: "Gir National Park",
      desc: "The last abode of the Asiatic lions in their natural habitat.",
      img: Gir_poster,
      features: ["Asiatic lions", "Wildlife safari", "Biodiversity hotspot"],
      buttonColor: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-black" id="places">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Famous Places in Gujarat
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the most iconic landmarks and destinations across Gujarat
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {places.map((place, i) => (
            <div
              key={i}
              className={`card-hover bg-gray-900 rounded-3xl p-8 border ${
                place.popular
                  ? "border-2 border-yellow-400 relative"
                  : "border-gray-800"
              }`}
            >
              {place.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                    MUST VISIT
                  </span>
                </div>
              )}
              <div className="text-center">
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-48 object-cover rounded-2xl mb-6"
                />
                <h3 className="text-2xl font-bold text-white mb-2">
                  {place.name}
                </h3>
                <p className="text-gray-400 mb-4">{place.desc}</p>
                <ul className="text-left text-gray-400 space-y-2 mb-6">
                  {place.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check className="inline-block text-green-400 mr-2 w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 bg-gradient-to-r ${
                    place.buttonColor
                  } ${
                    place.popular ? "text-black" : "text-white"
                  } font-semibold rounded-xl hover:opacity-90 transition`}
                >
                  Explore {place.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
