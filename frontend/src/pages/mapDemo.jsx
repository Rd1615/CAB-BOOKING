import { useEffect } from "react";

export default function DistanceMatrix() {
  useEffect(() => {
    const initMap = () => {
      const bounds = new window.google.maps.LatLngBounds();
      let markersArray = [];
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 55.53, lng: 9.4 },
        zoom: 10,
      });

      const geocoder = new window.google.maps.Geocoder();
      const service = new window.google.maps.DistanceMatrixService();

      const origin1 = { lat: 55.93, lng: -3.118 };
      const origin2 = "Greenwich, England";
      const destinationA = "Stockholm, Sweden";
      const destinationB = { lat: 50.087, lng: 14.421 };

      const request = {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      document.getElementById("request").innerText = JSON.stringify(
        request,
        null,
        2
      );

      service.getDistanceMatrix(request).then((response) => {
        document.getElementById("response").innerText = JSON.stringify(
          response,
          null,
          2
        );

        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;

        deleteMarkers(markersArray);

        const showGeocodedAddressOnMap = (asDestination) => {
          return ({ results }) => {
            map.fitBounds(bounds.extend(results[0].geometry.location));
            markersArray.push(
              new window.google.maps.Marker({
                map,
                position: results[0].geometry.location,
                label: asDestination ? "D" : "O",
              })
            );
          };
        };

        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;

          geocoder
            .geocode({ address: originList[i] })
            .then(showGeocodedAddressOnMap(false));

          for (let j = 0; j < results.length; j++) {
            geocoder
              .geocode({ address: destinationList[j] })
              .then(showGeocodedAddressOnMap(true));
          }
        }
      });

      function deleteMarkers(markers) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&v=weekly&solution_channel=GMP_CCS_distancematrix_v2";
      script.async = true;
      document.body.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex">
      {/* Map Section */}
      <div id="map" className="flex-grow h-full" />

      {/* Sidebar */}
      <div className="w-96 max-w-xl h-full overflow-auto p-4 bg-gray-50 border-l border-gray-200 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Request</h3>
        <pre
          id="request"
          className="flex-grow p-2 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto"
        />
        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre
          id="response"
          className="flex-grow p-2 bg-gray-900 text-yellow-400 rounded-lg text-sm overflow-x-auto"
        />
      </div>
    </div>
  );
}
