import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full p-4 bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)]">
      <nav className="space-y-2 pt-9 ">
      <Link  to="my-order"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        My Order
      </Link>
      <Link  to="become-a-seller"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Become A Seller
        </Link>
        <Link  to="add-product"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        AddProduct
        </Link>
        <Link  to="my-invetory"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        My-Invetory
        </Link>
        <Link  to="manage-orders"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Manage Orders
        </Link>
        
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Statistics
        </Link>
        {/* Add more navigation links as needed */}
       
        <Link  to="manage-users"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Manage-Users
        </Link>
      
       
    
      </nav>
    </div>
  );
};

export default Sidebar;
