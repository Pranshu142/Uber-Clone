import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CaptainLogoutButton from "../components/CaptainLogoutButton";
import CaptainDetails from "../components/CaptainDetails";
import RideAcceptPopUp from "../components/RideAcceptPopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CaptainConfirmRide from "../components/CaptainConfirmRide";

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
  const ridePopUp = useRef(null);
  const CaptainConfirmRideRef = useRef(null);
  const [CaptainConfirmRidePanelOpen, setCaptainConfirmRidePanelOpen] =
    useState(false);
  const [ridePopUpPanelOpen, setRidePopUpPanelOpen] = useState(false);

  useGSAP(() => {
    gsap.to(ridePopUp.current, {
      translateY: ridePopUpPanelOpen ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.inOut",
    });
  }, [ridePopUpPanelOpen]);

  useGSAP(() => {
    gsap.to(CaptainConfirmRideRef.current, {
      translateY: CaptainConfirmRidePanelOpen ? "0%" : "100%",
      duration: 0.4,
      ease: "power3.inOut",
      height: CaptainConfirmRidePanelOpen ? "100vh" : "0vh",
    });
  }, [CaptainConfirmRidePanelOpen]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Logout Button */}
      <CaptainLogoutButton
        className="absolute top-4 right-4 z-[1001]"
        setRidePopUpPanelOpen={setRidePopUpPanelOpen}
        ridePopUpPanelOpen={ridePopUpPanelOpen}
      />

      {/* Map */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={16}
        scrollWheelZoom
        className="h-screen w-screen"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>

      {/* Basic Ride Info */}
      <div className="fixed bg-gray-100 h-[50vh] lg:max-xl:h-[40vh] z-[1001] w-full bottom-0 flex flex-col gap-4 items-center px-4 py-5 rounded-t-3xl border-t border-gray-300 shadow-lg">
        <CaptainDetails />
      </div>

      {/* Ride Pop-Up */}
      <div
        ref={ridePopUp}
        className="fixed w-full bottom-0 translate-y-full z-[1001] bg-white shadow-lg flex flex-col gap-4 items-center px-4 py-6 rounded-t-3xl border-t border-gray-300"
      >
        <RideAcceptPopUp
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setCaptainConfirmRidePanelOpen={setCaptainConfirmRidePanelOpen}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={CaptainConfirmRideRef}
        className="fixed w-full bottom-0 translate-y-full z-[1002] bg-white shadow-lg flex flex-col gap-4 items-center px-4 py-6 rounded-t-3xl border-t border-gray-300 min-w-[200px]"
      >
        <CaptainConfirmRide
          setRidePopUpPanelOpen={setRidePopUpPanelOpen}
          setCaptainConfirmRidePanelOpen={setCaptainConfirmRidePanelOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
