import { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, MapPin, Star, Clock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RiderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/riders/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(response.data.rider);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4 w-full">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                <User size={48} className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-6 px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.fullname.firstname} {profile?.fullname.lastname}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-1 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">{profile?.email}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">4.8</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-2xl font-bold text-gray-800">24</div>
                <div className="text-xs text-gray-500">Rides</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">6</div>
                <div className="text-xs text-gray-500">Months</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Star className="text-yellow-500" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Rating
                  </div>
                  <div className="text-xs text-gray-500">4.8 out of 5</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Member Since
                  </div>
                  <div className="text-xs text-gray-500">September 2023</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="text-green-500" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Most Frequent Route
                  </div>
                  <div className="text-xs text-gray-500">
                    Downtown ↔ Airport
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
