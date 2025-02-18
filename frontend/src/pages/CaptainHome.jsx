import { useState, useEffect, useRef, useContext } from "react";
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
import { SocketContext } from "../context/SocketContext.jsx";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";

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
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userType: "captain",
      userId: captain._id,
    });

    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          socket.emit("update-captain-location", {
            userId: captain._id,
            location: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          });
        },
        (error) => {
          console.log(error);
          alert(`${Error(error.code)}: ${error.message}`);
        }
      );
      console.log(watchId);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    socket.on("ride-request", (data) => {
      const { ride } = data;
      setRide(ride);
      console.log(ride);
      setRidePopUpPanelOpen(true);
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("ride-request");
      socket.off("join");
    };
  }, [captain, socket]);

  const confirmRideButton = async () => {
    if (!ride) {
      console.error("No ride selected");
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm-ride`,
        {
          rideId: ride._id,
          captain: captain,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    setCaptainConfirmRidePanelOpen(true);
  };

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
          confirmRideButton={confirmRideButton}
          ride={ride}
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
          ride={ride}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
