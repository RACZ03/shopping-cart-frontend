import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    localStorage.setItem("token", response.data.data.access_token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed. Please try again.";
  }
};

export const getProfile = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
