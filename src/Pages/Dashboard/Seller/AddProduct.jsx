import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import { AuthContext } from "../../../provider/AuthProvider";
import useUsers from "../../../Hook/useUsers";

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext);
  const [users] = useUsers();

  const userExist = users.find((userEmail) => userEmail.email === user.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle image upload
  const handleImageUpload = async (event) => {
    
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        Swal.fire({
          icon: "success",
          title: "Image uploaded successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image upload failed!",
      });
    } finally {
      setLoading(false);
    }
  
  };

  // Form submission
  const onSubmit = async (data) => {

    setLoading(true);
    try {
     

      // First, fetch all products to check for duplicates
      const checkResponse = await fetch("http://localhost/BuyBuddies/index.php/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      const existingProducts = await checkResponse.json();
      console.log(existingProducts);
      // Check if product name already exists
      const isDuplicate = existingProducts.some(
        product => product.product_name.toLowerCase() === data.product_name.toLowerCase()
      );
       
      if (isDuplicate) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Product Already Exists",
          text: "A product with this name already exists. Please use product."
        });
        return;
      }

      // If no duplicate, proceed with adding the product
      const productData = {
        product_photo: imageUrl,
        product_name: data.product_name,
        product_price: data.product_price,
        product_details: data.product_details,
        product_quantity: data.product_quantity,
        user_id: parseInt(userExist.id),
      };

      const response = await fetch("http://localhost/BuyBuddies/index.php/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      
      await response.json();
      
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "success",
        title: "Product Added Successfully"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block mb-2">Product Image</label>
           {imageUrl && (
            <img
              src={imageUrl}
              alt="Product"
              className="mt-2 w-20 h-20 object-cover"
            />
          )}
          <input
            type="file"
            
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
         
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2">Product Name</label>
          <input
            {...register("product_name", {
              required: "Product name is required",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.product_name && (
            <p className="text-red-500">{errors.product_name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("product_price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.product_price && (
            <p className="text-red-500">{errors.product_price.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            {...register("product_quantity", {
              required: "Quantity is required",
              min: { value: 0, message: "Quantity must be positive" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.product_quantity && (
            <p className="text-red-500">{errors.product_quantity.message}</p>
          )}
        </div>

        {/* Product Details */}
        <div>
          <label className="block mb-2">Product Details</label>
          <textarea
            {...register("product_details", {
              required: "Product details are required",
            })}
            className="w-full p-2 border rounded"
            rows="4"
          />
          {errors.product_details && (
            <p className="text-red-500">{errors.product_details.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          {loading ? (
            <TbFidgetSpinner className="animate-spin h-5 w-5" />
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;