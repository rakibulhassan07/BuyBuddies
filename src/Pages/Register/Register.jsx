import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
const Register = () => {
    
  const {createUser,updateUserProfile,setUser}=useContext(AuthContext)

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photo = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");
  
    createUser(email, password, name, photo)
        .then(result => {
            console.log(result.user);
            // The user profile should now be updated with both name and photo
        })
        .catch((error) => {
            console.log(error);
        });
};
  

    const [visible,setVisible]=useState(false)
    const showPass = () => {
        setVisible((prev) => !prev)
      }

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
            <form onSubmit={handleRegister} className="card-body ">
              <p className="flex justify-center font-extrabold text-xl">Please Register</p>
              <div className="form-control">
              <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  name="photo"
                  type="text"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div> 
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>       
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className='relative'>
                <input 
                  name="password"
                  type={visible ? "text" : "password"}
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
                 
                <p className="p-4">
                  Already have an account? <Link className="font-semibold link link-hover" to="/login">Login</Link>
                </p>
              </div>
      
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
             
                 
      
          </div>
          </motion.div>
        </div>
              </div>
    );
};

export default Register;