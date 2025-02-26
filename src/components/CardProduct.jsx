import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCartPlus, BsTrash } from "react-icons/bs";
import { motion } from "framer-motion";
import { addToCartService, removeFromCartService } from "../services/cartService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardProduct = ({ product, isInCart, cartItemId, onUpdateCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");

  const openModal = () => {
    if (!userToken) {
      toast.error("You must log in to add products to the cart!");
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const openRemoveModal = () => setIsRemoveModalOpen(true);
  const closeRemoveModal = () => setIsRemoveModalOpen(false);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const addToCart = async () => {
    try {
      await addToCartService(product.id, quantity, userToken);
      toast.success("Product added to cart!");
      onUpdateCart();
      closeModal();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart. Please try again.");
    }
  };

  const removeFromCart = async () => {
    if (!cartItemId) return;
    try {
      await removeFromCartService(cartItemId, userToken);
      toast.success("Product removed from cart!");
      onUpdateCart();
      closeRemoveModal();
    } catch (error) {
      toast.error("Error removing product from cart. Please try again.");
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
        className="bg-white rounded-lg overflow-hidden shadow-md relative transition-transform duration-300 ease-in-out"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          <div className="p-4 border-t">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {isInCart ? (
                <button className="text-2xl text-red-600 hover:text-red-800" onClick={openRemoveModal}>
                  <BsTrash />
                </button>
              ) : (
                <button className="text-2xl text-gray-600 hover:text-gray-800" onClick={openModal}>
                  <BsCartPlus />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal for adding to cart */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add to Cart</h2>
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

            <div className="flex items-center mt-4">
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-semibold" onClick={() => handleQuantityChange(-1)}>-</button>
              <span className="mx-4 text-lg">{quantity}</span>
              <button className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-semibold" onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={addToCart}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for removing from cart */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Remove from Cart?</h2>
            <p className="text-gray-600">Are you sure you want to remove this item from your cart?</p>
            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={closeRemoveModal}>Cancel</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={removeFromCart}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProduct;
