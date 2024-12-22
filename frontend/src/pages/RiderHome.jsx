import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { gsap } from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel.jsx";
import AvailableRidesType from "../components/AvailableRidesType.jsx";

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

const RiderHome = () => {
  const mapRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const rideTypePannelRef = useRef(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [rideTypePannelOpen, setRideTypePannelOpen] = useState(false);
  const closeRideTypePannelRef = useRef(null);

  useGSAP(() => {
    if (panelOpen) {
      // Animate panel sliding up
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power3.out",
        padding: "10px",
      });
      gsap.to(closeRef.current, {
        opacity: "1",
      });
    } else {
      // Animate panel sliding down
      gsap.to(panelRef.current, {
        height: "0%",
        padding: "0",
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(closeRef.current, {
        opacity: "0",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (rideTypePannelOpen) {
      gsap.to(rideTypePannelRef.current, {
        height: "60vh",
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(closeRideTypePannelRef.current, {
        opacity: "1",
      });
    } else {
      gsap.to(rideTypePannelRef.current, {
        height: "0",
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(closeRideTypePannelRef.current, {
        opacity: "0",
      });
    }
  }, [rideTypePannelOpen]);

  return (
    <div className="relative h-screen w-screen">
      <img
        className="w-14 ml-12 mb-5 absolute z-[900]"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber logo"
      />
      {/* Map */}
      <div ref={mapRef}>
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

      {/* Booking Form */}
      <div className="flex flex-col justify-end absolute top-0 w-full h-screen z-[1000]">
        <div className="h-[30%] relative p-2 bg-white transition-all duration-500">
          <div className="flex justify-between items-center ">
            <h3 className="text-4xl font-bold mb-5">Find a ride</h3>
            <i
              ref={closeRef}
              className="ri-arrow-down-s-line ri-2x opacity-0"
              onClick={() => {
                setPanelOpen(false);
              }}
            ></i>
          </div>
          <form className="space-y-4 relative">
            <i className="ri-record-circle-line absolute top-2 left-4"></i>
            <div className="absolute w-0 h-[70px]  border-2  border-gray-700 rounded-full top-[23%] left-6"></div>

            <i className="ri-map-pin-fill absolute bottom-[0%] left-4"></i>
            <input
              className="w-full border-2 rounded-lg px-10 py-4 text-lg"
              type="text"
              placeholder="Enter your pickup location"
              onClick={() => {
                setPanelOpen(true);
              }}
            />
            <input
              className="w-full border-2 rounded-lg px-10 py-4 text-lg"
              type="text"
              placeholder="Enter your drop-off location"
              onClick={() => {
                setPanelOpen(true);
              }}
            />
          </form>
        </div>
        {/* Expanding Panel */}
        <div ref={panelRef} className="w-full bg-white h-0 p-0 overflow-y-auto">
          <LocationSearchPanel
            setPannelOpen={setPanelOpen}
            setRideTypePannelOpen={setRideTypePannelOpen}
          />
        </div>
        <div
          ref={rideTypePannelRef}
          className="fixed h-0 bg-white w-full py-3 px-2 overflow-y-auto"
        >
          <AvailableRidesType
            setRideTypePannelOpen={setRideTypePannelOpen}
            closeRideTypePannelRef={closeRideTypePannelRef}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default RiderHome;
