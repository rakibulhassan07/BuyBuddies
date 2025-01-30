import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add this import
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    // Replace YOUR_IMGBB_API_KEY with your actual ImgBB API key
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

    try {
      setLoading(false);
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Image upload failed!");
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  const onsubmit = async (data) => {
    try {
      setLoading(true);
      await createUser(data.email, data.password)
        .then((result) => {
          updateUserProfile(data.name, imageUrl)
            .then(() => {
              const saveUser = {
                email: data.email,
                name: data.name,
                photo: imageUrl,
                password: data.password,
                role: "customer",
              };
              fetch(`${process.env.REAC_APP_BACKEND_URL}/users`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(saveUser),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    reset();
                    Swal.fire("User Created Successfully");
                    navigate("/dashboard");
                  }
                });
            })
            .catch((err) => {
              console.log(err);
            });
          toast.success("Registration Successful!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("mail is already exist", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });

      setTimeout(() => {
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      }, 3000); // Changed to 3000ms to match toast duration
    } catch (error) {
      toast.error("Login failed! please enter valid password and email");
    }
  };
  const [visible, setVisible] = useState(false);
  const showPass = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)]">
      <ToastContainer />
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <motion.div
            className="text-center lg:text-left w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <iframe
              className="w-96 h-96 ml-20 lg:w-[400px] lg:h-[400px]"
              src="https://lottie.host/embed/70e1833b-1d2e-4938-9975-26d19b0d8c37/lmNpSq9IVr.json"
              title="Animation"
            ></iframe>
          </motion.div>
        </div>

        <motion.div
          className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl bg-[linear-gradient(90deg,_#87CEEB_0%,_#4682B4_100%)]">
            <form onSubmit={handleSubmit(onsubmit)} className="card-body">
              <p className="flex justify-center font-extrabold text-xl">
                Please Register
              </p>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="input input-bordered pt-2"
                />

                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="input input-bordered w-full"
                  />
                  <button
                    type="button"
                    onClick={showPass}
                    className="absolute inset-y-0 right-1 flex items-center text-gray-500 focus:outline-none"
                  >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="p-4">
                  Already have an account?{" "}
                  <Link className="font-semibold link link-hover" to="/login">
                    Login
                  </Link>
                </p>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default Register;
