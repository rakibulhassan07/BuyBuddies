import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
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
                        <NavLink to="/myprofile">My Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" className="text-2xl">
                            <FaCartShopping />
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Login Button on the Right */}
            <div className="flex-none">
                <NavLink to="/login" className="btn bg-black text-white rounded-full">
                    Login
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;