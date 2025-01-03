import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbFidgetSpinner } from "react-icons/tb";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showPass = () => setVisible((prev) => !prev);

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 6;

    if (!hasMinLength) {
      const errorMsg = "Password must contain at least 6 characters";
      toast.error(errorMsg);
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!validatePassword(password)) {
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
      toast.success("Login successful!"); // Added success toast
      // Wait for toast to be visible before navigation
      setTimeout(() => {
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      }, 1000); // Short delay to ensure toast is visible
    } catch (error) {
      toast.error("Login failed! please enter valid password and email");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <motion.div
            className="text-center lg:text-left w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <iframe
              className="w-96 ml-24 h-96 lg:w-[400px] lg:h-[400px]"
              src="https://lottie.host/embed/41cbd0c1-d016-438a-b8df-29288631386e/SIbgJpwCuh.json"
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
          <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-[linear-gradient(90deg,_#87CEEB_0%,_#4682B4_100%)]">
            <form onSubmit={handleLogin} className="card-body">
              <p className="flex justify-center font-extrabold text-xl">
                Please Login Your Account
              </p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={visible ? "text" : "password"} // added djsahfisd
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={showPass}
                    className="absolute inset-y-0 right-1 flex items-center text-gray-500 focus:outline-none"
                  >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <p>
                If you are new here please{" "}
                <Link className="font-semibold link link-hover" to="/register">
                  Register
                </Link>
              </p>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin h-5 w-5" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Login;
