import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useOrder from "../../../Hook/useOrder";
import useUsers from "../../../Hook/useUsers";
import useProducts from "../../../Hook/useProducts";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import PayModal from "./PayModal";
import { CgLayoutGrid } from "react-icons/cg";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const { id } = useParams();
  const [products] = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const matchId = products.find((product) => product.id === id);
  const customerData = users?.find(
    (userEmail) => userEmail?.email === user?.email
  );
  
  const useOrdered = orders?.filter(
    (userProducts) => userProducts?.user_id === customerData?.id
  );

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost/BuyBuddies/index.php/api/order/${orderId}`
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
        
        setOrders(orders.filter(order => order.id !== orderId));
      } else {
        toast.error("Failed to cancel order. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Error cancelling order: " + (error.response?.data?.error || "Unknown error"), {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handlePayment = async (orderId) => {
    try {
      const response = await axios.post(
        `http://localhost/BuyBuddies/index.php/api/order/${orderId}`,
        { status: 'paid' }
      );

      if (response.data.message) {
        toast.success("Payment successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setOrders(orders.map(order => 
          order.id === orderId ? {...order, status: 'paid'} : order
        ));
      } else {
        toast.error("Payment failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Error processing payment: " + (error.response?.data?.error || "Unknown error"), {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] py-8">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CgLayoutGrid className="text-gray-500" size={20} />
            <span className="text-gray-600">{useOrdered?.length || 0} Orders</span>
          </div>
        </div>

        {!useOrdered?.length ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {useOrdered.map((order) => (
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
                        <p className="text-gray-600">
                          Status: <span className="text-red-700">{order.status}</span>
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
                    <div className="text-lg text-gray-600">
                      Address: {order.address}
                    </div>

                    {order.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsOpen(true);
                          }}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
                        >
                          Pay Now
                        </button>
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PayModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default MyOrder;