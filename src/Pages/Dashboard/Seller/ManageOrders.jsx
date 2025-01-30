import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import useUsers from "../../../Hook/useUsers";
import useOrder from "../../../Hook/useOrder";
import axios from "axios";
import { CgLayoutGrid } from "react-icons/cg";

const ManageOrders = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const [orders, setOrders] = useOrder();

  const sellerData = users?.find(
    (userEmail) => userEmail?.email === user?.email
  );

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${process.env.REAC_APP_BACKEND_URL}/order/${orderId}`,
        { status: newStatus }
      );

      if (response.data.message) {
        toast.success("Order status updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.delete(
        `${process.env.REAC_APP_BACKEND_URL}/order/${orderId}`
      );

      if (response.data.message) {
        toast.success("Order cancelled successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] py-8">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CgLayoutGrid className="text-gray-500" size={20} />
            <span className="text-gray-600">{orders?.length || 0} Orders</span>
          </div>
        </div>

        {!orders?.length ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        className="w-20 h-20 object-cover rounded-lg"
                        src={order.product_photo}
                        alt={order.product_name}
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {order.product_name}
                        </h2>
                        <p className="text-gray-600 text-lg">
                          Customer: {order.user_email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        Price: ${order.price}
                      </div>
                      <div className="text-lg text-gray-600">
                        Qty: {order.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">Status:</span>
                        <select
                          className="border rounded-lg px-3 py-1.5 text-sm bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="text-lg text-gray-600">
                        Address: {order.address}
                      </div>
                    </div>

                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
