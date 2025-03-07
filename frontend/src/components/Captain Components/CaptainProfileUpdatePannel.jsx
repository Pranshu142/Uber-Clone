import { useState, useContext } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { CaptainDataContext } from "../../context/CaptainContext";
import axios from "axios";
import { toast } from "react-toastify";

const CaptainProfileUpdatePannel = ({ captain, onClose }) => {
  const { updateCaptain } = useContext(CaptainDataContext);
  const [formData, setFormData] = useState({
    fullname: {
      firstname: captain?.fullname?.firstname || "",
      lastname: captain?.fullname?.lastname || "",
    },
    email: captain?.email || "",
    upiId: captain?.upiId || "",
    vehicleInfo: {
      color: captain?.vehicleInfo?.color || "",
      plate: captain?.vehicleInfo?.plate || "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/captains/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        }
      );

      if (response.data.success) {
        updateCaptain(response.data.captain);
        onClose();
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-3 max-h-screen overflow-y-auto">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-xl font-bold text-center mb-5">Update Profile</h1>
        <X
          role="button"
          tabIndex={0}
          className="cursor-pointer"
          onClick={onClose}
        />
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <fieldset className="border rounded-lg p-4">
          <legend className="text-lg font-semibold px-2">Personal Info</legend>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.fullname.firstname}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullname: {
                        ...prev.fullname,
                        firstname: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.fullname.lastname}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullname: {
                        ...prev.fullname,
                        lastname: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">UPI ID</label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, upiId: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2"
              />
            </div>
          </div>
        </fieldset>

        {/* Vehicle Information */}
        <fieldset className="border rounded-lg p-4">
          <legend className="text-lg font-semibold px-2">Vehicle Info</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Vehicle Color
              </label>
              <input
                type="text"
                value={formData.vehicleInfo.color}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      color: e.target.value,
                    },
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                License Plate
              </label>
              <input
                type="text"
                value={formData.vehicleInfo.plate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      plate: e.target.value,
                    },
                  }))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

CaptainProfileUpdatePannel.propTypes = {
  captain: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CaptainProfileUpdatePannel;
