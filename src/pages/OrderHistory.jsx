import { useEffect, useState } from "react";
import { getOrdersService } from "../services/cartService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (userToken) {
      fetchOrders();
    }
  }, [userToken]);

  const fetchOrders = async () => {
    try {
      const orderData = await getOrdersService(userToken);
      setOrders(orderData);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Order History</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <p className="text-gray-600 mt-4 text-lg">No orders found.</p>
          <Link to="/" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition">
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Total Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-6">{order.id}</td>
                  <td className="py-3 px-6 font-semibold text-green-600">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-6">{new Date(order.orderDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
