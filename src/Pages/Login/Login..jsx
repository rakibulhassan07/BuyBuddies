import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Login =() => {
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
    <div className="card  w-full max-w-sm shrink-0 shadow-2xl bg-[linear-gradient(90deg,_#87CEEB_0%,_#4682B4_100%)]">
      <form className="card-body ">
        <p className="flex justify-center font-extrabold text-xl">Please Login Your Account</p>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>          
            <p>
              If you are new hare please {" "}
              <Link className="font-semibold link link-hover" to="/register">Register</Link>
            </p>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
       
           

    </div>
    </motion.div>
  </div>
        </div>
    );
};

export default Login