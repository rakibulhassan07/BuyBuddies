import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BecomeSeller from "../../../Pages/Dashboard/Common/BecomeSeller";
import { AuthContext } from "../../../provider/AuthProvider";
import useUsers from "../../../Hook/useUsers";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const userExist = users.find((userEmail) => userEmail.email === user.email);

  const DependRole = () => {
    switch (userExist?.role) {
      case 'admin':
        return (
          <>
            <Link
              to="statistics"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Statistics
            </Link>
            <Link
              to="manage-users"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Manage-Users
            </Link>
          </>
        );

      case 'seller':
        return (
          <>
            <Link
              to="add-product"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              AddProduct
            </Link>
            <Link
              to="my-invetory"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              My-Invetory
            </Link>
            <Link
              to="manage-orders"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Manage Orders
            </Link>
          </>
        );

      case 'customer':
        return (
          <>
           
            <Link
              to="become-a-seller"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Become A Seller
            </Link>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full p-4 bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)]">
      <nav className="space-y-2 pt-9">
        {DependRole()}
      </nav>
    </div>
  );
};

export default Sidebar;