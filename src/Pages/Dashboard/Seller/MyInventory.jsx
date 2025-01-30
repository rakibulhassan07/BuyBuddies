import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useUsers from "../../../Hook/useUsers";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useProducts from "../../../Hook/useProducts";
import { CgLayoutGrid } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";

const MyInventory = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const [products, setProducts] = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const customerData = users?.find(
    (userEmail) => userEmail?.email === user?.email
  );
  const useProduct = products?.filter(
    (userProducts) => userProducts?.user_id === customerData?.id
  );

  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        `${process.env.REAC_APP_BACKEND_URL}/product/${productId}`,
        updatedData
      );

      if (response.data.message) {
        toast.success("Product updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Update local state
        setProducts(
          products.map((product) =>
            product.id === productId ? { ...product, ...updatedData } : product
          )
        );

        // Reset editing state
        setEditingProduct(null);
      } else {
        toast.error("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        "Error updating product: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };

  const handleCancel = async (productId) => {
    
    try {
      const response = await axios.delete(
        `${process.env.REAC_APP_BACKEND_URL}/product/${productId}`
      );

      if (response.data.message) {
        toast.success("Product deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        setProducts(products.filter((product) => product.id !== productId));
      } else {
        toast.error("Failed to delete product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        "Error deleting product: " +
          (error.response?.data?.error || "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] py-8">
      <ToastContainer />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Inventory</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CgLayoutGrid className="text-gray-500" size={20} />
            <span className="text-gray-600">{useProduct.length} Products</span>
          </div>
        </div>

        {useProduct.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products in your inventory
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useProduct.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={product.product_photo}
                    alt={product.product_name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-sm">
                      ${product.product_price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {product.product_name}
                    </h2>
                    {editingProduct?.id === product.id ? (
                      <div className="space-y-2">
                        Price:
                        <input
                          type="number"
                          value={editingProduct.product_price}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              product_price: e.target.value,
                            })
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="New Price"
                        />
                        Quantity: 
                        <input
                          type="number"
                          value={editingProduct.product_quantity}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              product_quantity: e.target.value,
                            })
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="New Quantity"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdateProduct(product.id, {
                                product_price: editingProduct.product_price,
                                product_quantity:
                                  editingProduct.product_quantity,
                              })
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm">Stock:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            product.product_quantity > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.product_quantity} units
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    {!editingProduct ? (
                      <>
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit Product
                        </button>
                        <button
                          onClick={() => handleCancel(product.id)}
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
                          Delete Product
                        </button>
                      </>
                    ) : null}
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

export default MyInventory;
