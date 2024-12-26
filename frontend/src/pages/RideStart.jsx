import { MapPin, Coins } from "lucide-react";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Rings from "react-loading-icons/dist/esm/components/rings";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const RideStart = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Uber Logo */}
      <img
        className="w-14 ml-12 mb-5 absolute z-[900]"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber logo"
      />

      {/* Map */}
      <div className="h-full w-full">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
          className="h-screen w-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Ride Info Panel */}
      <div className="flex flex-col items-start gap-5 px-4 py-5 absolute bottom-0 h-[60vh] z-[1001] w-full bg-white shadow-lg shadow-gray-300 overflow-y-auto rounded-t-3xl">
        {/* Ride Status */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl sm:text-2xl font-bold">Ride has started...</h3>
          <Rings
            stroke="green"
            strokeOpacity={0.4}
            speed={0.7}
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
        </div>

        {/* Vehicle Image */}
        <div className="w-full flex justify-center items-center py-5 rounded-2xl bg-gray-100 shadow-md">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/600/735/small/modern-car-isolated-on-background-3d-rendering-illustration-png.png"
            alt="Vehicle"
            className="object-cover object-center h-28 w-28 sm:h-32 sm:w-32"
          />
        </div>

        {/* Ride Details */}
        <div className="flex flex-col w-full gap-4">
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 sm:py-5 active:border-2 active:border-black w-full text-left">
            <MapPin className="h-5 w-5" />
            <h3 className="text-sm sm:text-lg font-semibold">
              1600 Amphitheatre Parkway, Bengaluru, Karnataka
            </h3>
          </button>

          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-4 sm:py-5 active:border-2 active:border-black w-full text-left">
            <Coins className="h-5 w-5" />
            <h3 className="text-sm sm:text-lg font-semibold">₹60</h3>
          </button>

          {/* Payment Button */}
          <button className="bg-green-400 hover:bg-green-500 px-3 py-4 sm:py-5 w-full rounded-full text-lg sm:text-2xl font-bold active:border-2 active:border-black transition-all duration-200">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideStart;
