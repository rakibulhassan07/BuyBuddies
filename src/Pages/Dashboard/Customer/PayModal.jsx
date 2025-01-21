import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useUsers from "../../../Hook/useUsers";
import axios from "axios";
import { toast } from "react-toastify";
import useProducts from "../../../Hook/useProducts";

const PayModal = ({ isOpen, setIsOpen, selectedOrder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users] = useUsers();
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [products] = useProducts();
  const customerData = users?.find(
    (userEmail) => userEmail?.email === user?.email
  );

  if (!selectedOrder) {
    return null;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(customerData?.id);
    try {
      // First create payment record
      const paymentResponse = await axios.post(
        'http://localhost/BuyBuddies/index.php/api/payment',
        {
          user_id: customerData?.id,
          payment_method: paymentMethod,
          order_price: selectedOrder?.price,
          product_id: selectedOrder?.product_id
        }
      );

        if (paymentResponse.data.message) {
            // Update order status to paid
            const orderResponse = await axios.post(
                `http://localhost/BuyBuddies/index.php/api/order/${selectedOrder?.id}`,
                { status: "paid" }
            );

        if (orderResponse.data.message) {
          toast.success("Payment successful! Your order has been confirmed.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Close modal after successful payment
          setIsOpen(false);
          // Optionally reload the page or update the orders list
          window.location.reload();
        } else {
          toast.error("Payment was processed but order status update failed. Please contact support.", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      } else {
        toast.error("Payment processing failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(
        "Error processing payment: " +
        (error.response?.data?.error || "Please check your payment details and try again"),
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => !isLoading && setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6">
          <DialogTitle className="text-xl font-bold mb-4">
            Payment Details
          </DialogTitle>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Product Name:</span>
                <span>{selectedOrder?.product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{selectedOrder?.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Customer Name:</span>
                <span>{customerData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Delivery Address:</span>
                <span>{selectedOrder?.address}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Payment Method:</span>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="border p-2 rounded"
                  disabled={isLoading}
                >
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                </select>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total Price:</span>
                <span>${selectedOrder?.price}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => !isLoading && setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Processing Payment..." : "Confirm Payment"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PayModal;