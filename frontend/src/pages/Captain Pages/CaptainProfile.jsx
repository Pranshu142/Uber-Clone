import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CaptainDataContext } from "../../context/CaptainContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainProfileUpdatePannel from "../../components/Captain Components/CaptainProfileUpdatePannel";
import {
  ChevronLeft,
  X,
  MailIcon,
  PhoneIcon,
  Car,
  Wallet,
  Star,
} from "lucide-react";

const CaptainProfile = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const updationPannel = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (captain) {
      setLoading(false);
    }
  }, [captain]);

  useGSAP(() => {
    if (isEditing) {
      gsap.to(updationPannel.current, {
        height: "100vh",
        y: 0,
        duration: 0.6,
        ease: "back.out(1.2)",
        opacity: 1,
      });
    } else {
      gsap.to(updationPannel.current, {
        height: "0",
        y: 100,
        duration: 0.5,
        ease: "power3.inOut",
        opacity: 0,
      });
    }
  }, [isEditing]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      <ToastContainer position="top-center" />

      {/* Header */}
      <header className="rounded-b-md shadow-md shadow-gray-400 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronLeft size={24} color="black" />
            </button>
            <h1 className="text-xl font-semibold text-black">
              Captain Profile
            </h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            {isEditing ? (
              <X size={24} color="black" />
            ) : (
              <div className="px-5 py-2 bg-gray-300 rounded-2xl shadow-md shadow-slate-500">
                <span className="text-md font-semibold text-black">Edit</span>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Profile Content */}
      <div className="container px-3 w-full py-2 max-w-2xl mx-auto">
        <div className="p-3 mt-10 shadow-md shadow-gray-500 rounded-t-md border-1 border-gray-400 overflow-x-hidden">
          {/* Profile Header Section */}
          <section className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-6">
            <div className="flex justify-center md:justify-start">
              <div className="w-24 h-24 bg-gray-300 shadow-md rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1536396123481-991b5b636cbb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  className="w-full h-full object-cover"
                  alt="Captain Profile"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-lg font-bold tracking-wide">
                {captain?.fullname?.firstname} {captain?.fullname?.lastname}
              </h1>
              <div className="flex items-center gap-1 justify-center md:justify-start">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600">
                  {captain?.averageRating?.toFixed(1) || "4.5"}
                </span>
              </div>
            </div>
          </section>

          {/* Personal Info Section */}
          <div className="space-y-4 mb-6">
            {[
              {
                icon: <MailIcon size={24} />,
                label: "Email",
                value: captain?.email,
              },
              {
                icon: <PhoneIcon size={24} />,
                label: "UPI ID",
                value: captain?.upiId,
              },
              {
                icon: <Car size={24} />,
                label: "Vehicle Info",
                value: `${captain?.vehicleInfo?.color} ${captain?.vehicleInfo?.vehicleType} (${captain?.vehicleInfo?.plate})`,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-[120px]">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="text-gray-600 break-all">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <Wallet className="w-6 h-6 mx-auto text-green-500" />
              <div className="mt-2">
                <div className="font-bold text-xl">
                  ₹{Math.trunc(captain?.totalEarnings || 0)}
                </div>
                <div className="text-xs text-gray-500">Todays Earnings</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <Car className="w-6 h-6 mx-auto text-blue-500" />
              <div className="mt-2">
                <div className="font-bold text-xl">{captain?.totalRides}</div>
                <div className="text-xs text-gray-500">Total Rides</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <Star className="w-6 h-6 mx-auto text-yellow-500" />
              <div className="mt-2">
                <div className="font-bold text-xl">
                  {captain?.averageRating?.toFixed(1) || "4.5"}
                </div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 px-6 mt-20 text-gray-800 rounded-t-xl shadow-md shadow-slate-600">
        <div className="w-full text-center">
          <h2 className="text-base font-semibold">Need Help?</h2>
          <p className="text-sm text-gray-700 mt-1">
            We&apos;re here for you 24/7. Reach out anytime!
          </p>
          <div className="mt-3 flex justify-center gap-3">
            <button className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
              Help Center
            </button>
            <button className="flex-1 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg">
              Terms & Privacy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2025 Uber Clone. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Update Panel */}
      <div
        ref={updationPannel}
        className="fixed h-0 bottom-0 w-screen bg-gray-200"
      >
        <CaptainProfileUpdatePannel
          captain={captain}
          setCaptain={setCaptain}
          onClose={() => setIsEditing(false)}
        />
      </div>
    </div>
  );
};

export default CaptainProfile;
