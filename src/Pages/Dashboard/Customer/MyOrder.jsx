import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useOrder from "../../../Hook/useOrder";
import useUsers from "../../../Hook/useUsers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const [orders, setOrders] = useOrder();
 
  
  const customerData = users?.find(
    (userEmail) => userEmail?.email === user?.email
  );
  
  const useOrdered = orders?.filter(
    (userProducts) => userProducts?.user_id === customerData?.id
  );
 
  const handleCancel = async (orderId) => {
    try {
      // Confirm with user before cancelling
     

      // Send DELETE request to backend
      const response = await axios.delete(
        `http://localhost/BuyBuddies/index.php/api/order/${orderId}`
      );

      if (response.data.message) {
        // Show success toast
        toast.success("Order cancelled successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Remove the cancelled order from local state
        setOrders(orders.filter(order => order.id !== orderId));
      } else {
        // Show error toast if response doesn't contain success message
        toast.error("Failed to cancel order. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Show error toast for caught exceptions
      toast.error("Error cancelling order: " + (error.response?.data?.error || "Unknown error"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="max-w-[80%] mx-auto">
      {/* ToastContainer for showing notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
       
      <h1 className="text-2xl font-semibold uppercase text-center m-5">My Orders</h1>

      <table className="w-[100%]">
        <thead>
          <tr>
            <th className="text-left">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {useOrdered.map((orders) => ( 
            <tr className="text-center" key={orders.id}>
              <td className="p-3">
                <img className="w-24" src={orders?.product_photo} alt="" />
              </td>
              <td className="p-3">{orders?.product_name}</td>
              <td className="p-3">{orders?.price}</td>
              <td className="p-3">{orders?.quantity}</td>
              <td className="p-3 text-red-700">{orders?.status}</td>
              <td className="p-3">
                {orders?.status === "pending" && (
                  <button
                    onClick={() => handleCancel(orders.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                  >
                    Cancel Order
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;