import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../services/authService";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Register = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const { confirmPassword, ...registerData } = userData; // Remove confirmPassword before sending
            await register(registerData);
            toast.success("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-900 to-gray-900">
            <div className="w-full max-w-2xl p-10 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up for SoundWave Shop</h2>
                <p className="text-gray-600 text-center">Create an account</p>

                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="First Name"
                                value={userData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="Last Name"
                                value={userData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your Address"
                            value={userData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            value={userData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-10"
                                placeholder="Password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-3 mt-6 flex items-center text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-10"
                                placeholder="Confirm Password"
                                value={userData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="absolute inset-y-0 right-3 mt-6 flex items-center text-gray-500 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-500 hover:underline">
                        Login
                    </a>
                </p>
                <div className="flex items-center justify-center space-x-2 top-4 left-4">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition"
                    >
                        <FaArrowLeft className="text-lg mr-1" />
                        <span className="text-sm font-semibold">Go to Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
