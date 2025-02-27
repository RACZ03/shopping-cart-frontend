import { useEffect, useState } from "react";
import { getCartItemsService, addToCartService, removeFromCartService, clearCartService, processOrderService } from "../services/cartService";
import { toast } from "react-toastify";
import { BsTrash, BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import cartEmptyImage from "../assets/img/cart-empty.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [isProcessOrderModalOpen, setIsProcessOrderModalOpen] = useState(false);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      fetchCartItems();
    }
  }, [userToken]);

  const fetchCartItems = async () => {
    try {
      const cartData = await getCartItemsService(userToken);
      setCartItems(cartData);
    } catch (error) {
      toast.error("Failed to fetch cart items");
    }
  };

  const updateQuantity = async (cartItem, change) => {
    try {
      await addToCartService(cartItem.productId, cartItem.quantity + change, userToken);
      fetchCartItems();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await removeFromCartService(cartItemId, userToken);
      fetchCartItems();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartService(cartItems, userToken);
      fetchCartItems();
      toast.success("Cart cleared successfully");
      setIsClearCartModalOpen(false);

    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  const processOrder = async () => {
    try {
      await processOrderService(userToken);
      toast.success("Order processed successfully!");
      fetchCartItems();
      setIsProcessOrderModalOpen(false);
    } catch (error) {
      toast.error("Failed to process order");
    }
  };

  const totalAmount = cartItems?.length
    ? cartItems.reduce((total, item) => total + (item.quantity * (item.productPrice || 0)), 0)
    : 0;

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <button
        className="flex items-center text-gray-600 hover:text-blue-500 mb-4 transition"
        onClick={() => navigate("/")}
      >
        <BsArrowLeft className="mr-2" /> Back to Store
      </button>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {(cartItems.length === 0 || !cartItems) ? (
        <div className="flex flex-col items-center mt-10">
          <img src={cartEmptyImage} alt="Empty Cart" className="w-48 h-48 opacity-75" />
          <p className="text-gray-600 mt-4">Your cart is empty.</p>
          <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div className="flex items-center">
                <img
                  src={item?.productImage || cartEmptyImage}
                  alt={item?.productName || 'Product Image'}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item?.productName || ''}</h2>
                  <p className="text-gray-600">${(item?.productPrice || 0).toFixed(2)}</p>
                </div>
              </div>


              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 bg-gray-200 rounded-lg" onClick={() => updateQuantity(item, -1)}>-</button>
                <span className="mx-2 text-lg">{item.quantity}</span>
                <button className="px-3 py-1 bg-gray-200 rounded-lg" onClick={() => updateQuantity(item, 1)}>+</button>


                <button className="text-red-600 text-xl" onClick={() => removeItem(item.id)}>
                  <BsTrash />
                </button>
              </div>
            </div>
          ))}


          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-right">
            <h2 className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</h2>
          </div>


          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={() => setIsClearCartModalOpen(true)}
            >
              Clear Cart
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setIsProcessOrderModalOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {/* Confirm Clear Cart Modal */}
      {isClearCartModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Clear Cart?</h2>
            <p className="text-gray-600">Are you sure you want to remove all items from your cart?</p>
            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setIsClearCartModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={clearCart}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Process Order Modal */}
      {isProcessOrderModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Order?</h2>
            <p className="text-gray-600">Are you sure you want to proceed with the checkout?</p>
            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setIsProcessOrderModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={processOrder}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
