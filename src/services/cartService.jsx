import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const addToCartService = async (productId, quantity, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart`,
      { productId, quantity },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCartItemsService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

export const removeFromCartService = async (productId, token) => {
  try {
    await axios.delete(`${API_URL}/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

export const clearCartService = async (cartItems, token) => {
  try {
    await Promise.all(cartItems.map(item => removeFromCartService(item.id, token)));
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const processOrderService = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error processing order:", error);
    throw error;
  }
};

export const getOrdersService = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};