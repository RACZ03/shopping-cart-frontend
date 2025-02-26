import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data.data
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
