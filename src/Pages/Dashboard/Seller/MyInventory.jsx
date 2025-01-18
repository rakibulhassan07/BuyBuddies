import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useUsers from '../../../Hook/useUsers';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import useProducts from '../../../Hook/useProducts';
import { CgLayoutGrid } from 'react-icons/cg';

const MyInventory = () => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers();
    const [products, setProducts] = useProducts();
    const customerData = users?.find(
        (userEmail) => userEmail?.email === user?.email
    );
    const useProduct = products?.filter(
        (userProducts) => userProducts?.user_id === customerData?.id
    );
      
    const handleCancel = async (productId) => {
        try {
            // Send DELETE request to backend
            const response = await axios.delete(
              `http://localhost/BuyBuddies/index.php/api/product/${productId}`
            );
      
            if (response.data.message) {
              // Show success toast
              toast.success("Delete Product successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
                                                                        
              // Remove the cancelled order from local state
              setProducts(products.filter(product => product.id !== productId));
            } else {
              // Show error toast if response doesn't contain success message
              toast.error("Failed to Delete product. Please try again.", {
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
            console.error("Error delete product:", error);
            // Show error toast for caught exceptions
            toast.error("Error delete product: " + (error.response?.data?.error || "Unknown error"), {
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
                 
            <h1 className="text-2xl font-semibold uppercase text-center m-5">My Products</h1>
          
            <table className="w-[100%]">
                <thead>
                    <tr>
                        <th className="text-left">Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {useProduct.map((product) => ( 
                        <tr className="text-center" key={product.id}>
                            <td className="p-3">
                                <img className="w-20" src={product?.product_photo} alt="" />
                            </td>
                            <td className="p-3">{product?.product_name}</td>
                            <td className="p-3">{product?.product_price}</td>
                            <td className="p-3">{product?.product_quantity}</td>
                            <td className="p-3">
                                <button
                                    onClick={() => handleCancel(product.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                                >
                                    Delete Product
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody> 
            </table>
        </div>
    );
};

export default MyInventory;