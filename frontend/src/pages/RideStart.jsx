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
    <div className="relative h-screen w-screen ">
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

      <div className="flex flex-col items-start gap-10 px-3 py-5 absolute bottom-0 h-[60vh] z-[1001] w-full bg-white overflow-y-auto">
        <div className="flex justify-between items-center gap-10 px-2 py-3">
          <h3 className="text-2xl font-bold">ride has started...</h3>
          <Rings stroke="green" strokeOpacity={0.3} speed={0.7} />
        </div>
        <div className="relative w-full flex justify-center items-center px-2 py-5 rounded-2xl  shadow-lg shadow-gray-300">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/048/600/735/small/modern-car-isolated-on-background-3d-rendering-illustration-png.png"
            className="object-cover object-center h-32 w-32"
          ></img>
        </div>
        <div className="flex flex-col w-full gap-5">
          <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-5 active:border-3 active:border-black  w-full text-left">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg font-semibold">
              1600 Amphitheatre Parkway, Bengaluru, Karnataka
            </h3>
          </button>

          <button className="flex justify-start items-center gap-2 bg-gray-200 hover:bg-gray-300 rounded-2xl px-3 py-5 active:border-3 active:border-black w-full text-left">
            <Coins className="h-5 w-5" />
            <h3 className="text-lg font-semibold">₹60</h3>
          </button>
          <button className="bg-green-400 hover:bg-green-500 px-3 py-5 w-full rounded-full my-5 text-2xl font-bold active:border-3 active:border-black">
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideStart;
