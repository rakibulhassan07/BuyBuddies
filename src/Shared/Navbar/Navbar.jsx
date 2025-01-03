import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "../../provider/AuthProvider";
const Navbar = () => {

   const {user,logOut}=useContext(AuthContext);

   const handleSingOut = () => {
    logOut()
  };

  return (
    <div className="sticky top-0 z-50 bg-orange-200 backdrop-blur-lg shadow-md p-4 flex items-center justify-between">
      {/* Logo on the left */}
      <div>
        <a className="btn btn-ghost text-xl">BuyBuddies</a>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex-grow flex justify-center">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/myprofile">My profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="text-2xl">
              <FaCartShopping />
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Login Button on the Right */}
      <div className="flex items-center gap-4 flex-none">
      {user && user?.email ? (
          <div>
            <img
              src={user?.photoURL}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p>{user.displayName}</p>
          </div>
        ) : (
          <iframe
            className="w-12 h-12 md:w-16 md:h-16"
            src="https://lottie.host/embed/21c0f04d-247e-460b-921b-f165217a9ef3/Mov0qGZhSD.json"
          ></iframe>
        )}
      {
        user?
        
        <button onClick={handleSingOut}  className="btn bg-black text-white rounded-full">Sign Out</button>
     
        :
        <Link to="/login" className="btn bg-black text-white rounded-full">
         <button>Log In </button>
        </Link>
      }
      
    </div>
    </div>
  );
};

export default Navbar;
