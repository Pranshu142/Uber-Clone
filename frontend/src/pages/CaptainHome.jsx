import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Clock, Gauge, NotepadTextDashed } from "lucide-react";
import CaptainLogoutButton from "../components/CaptainLogoutButton";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};
const CaptainHome = () => {
  return (
    <div className="h-screen w-screen relative">
      <CaptainLogoutButton className=" top-0 right-0 z-[1001]" />
      <div className="h-full w-full">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={16}
          scrollWheelZoom={true}
          className="h-screen w-screen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div className="captain-basic-ride-info absolute  bg-orange-100 h-[50vh] z-[1001] w-full bottom-0  flex flex-col gap-10 items-center px-3 py-5 rounded-t-4xl border-2  border-gray-400">
        <div className="w-full flex justify-between items-center mt-5 px-3">
          <div className="flex gap-5 items-center">
            <div>
              <img
                src="https://media.smallbiztrends.com/2023/07/How-to-Become-an-Uber-Driver.png"
                className="h-20 w-20 object-center object-cover rounded-full"
              ></img>
            </div>
            <div>
              <h3>
                <span className="text-lg ">Driver Name</span>
              </h3>
              <h3>
                <span className="text-base text-gray-400">Driver Level</span>
              </h3>
            </div>
          </div>
          <div>
            <h3 className="w-full text-end text-lg ">₹60</h3>
            <h3 className="w-full text-end text-lg text-gray-400">Earned</h3>
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-3 py-10  rounded-3xl border-2 border-red-300 shadow-md  shadow-gray-400 gap-3 bg-yellow-200 ">
          <div className="flex  flex-col  items-center gap-3">
            <div className="flex justify-center  ">
              <Clock
                color="black"
                absoluteStrokeWidth
                stroke="gray"
                className="h-12 w-12"
              />
            </div>
            <h3 className="text-3xl font-bold">10</h3>
            <h3 className="mt-2 text-base text-gray-500 text-center">
              Total time online
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center">
              <Gauge
                color="black"
                absoluteStrokeWidth
                stroke="gray"
                className="h-12 w-12 "
              />
            </div>
            <h3 className="text-3xl font-bold">30 Km</h3>
            <h3 className="mt-2 text-base text-gray-500 text-center">
              Total time online
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center">
              <NotepadTextDashed
                color="black"
                absoluteStrokeWidth
                stroke="gray"
                className="h-12 w-12"
              />
            </div>
            <h3 className="text-3xl font-bold">20</h3>
            <h3 className="mt-2 text-base text-gray-500 text-center">
              Total time online
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
