import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full p-4">
      <nav className="space-y-2 pt-9">
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Statistics
        </Link>
        {/* Add more navigation links as needed */}
        <Link  to="add-product"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        AddProduct
        </Link>
        <Link  to="manage-users"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Manage-Users
        </Link>
        <Link  to="my-invetory"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        My-Invetory
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
