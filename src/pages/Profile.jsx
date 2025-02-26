import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/authService";
import { toast } from "react-toastify";
import { FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        dateOfBirth: "",
    });

    const userToken = localStorage.getItem("token");

    useEffect(() => {
        if (userToken) {
            fetchProfile();
        }
    }, [userToken]);

    const fetchProfile = async () => {
        try {
            const profileData = await getProfile(userToken);
            setUserProfile(profileData);
            setFormData({
                id: profileData.id,
                firstName: profileData.firstName || "",
                lastName: profileData.lastName || "",
                address: profileData.address || "",
                dateOfBirth: profileData.dateOfBirth || "",
                email: profileData.email,
            });
        } catch (error) {
            toast.error("Failed to load profile data");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData.id, formData, userToken);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            fetchProfile();
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>

            {userProfile ? (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <FaUserAlt className="text-4xl text-gray-600 mr-4" />
                            <div>
                                <h2 className="text-xl font-semibold">{userProfile.firstName} {userProfile.lastName}</h2>
                                <p className="text-gray-600">{userProfile.email}</p>
                            </div>
                        </div>
                        <button
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? <FaSave /> : <FaEdit />}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
                                value={userProfile.email}
                                disabled
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <button
                            className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-600">Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
