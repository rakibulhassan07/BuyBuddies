import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root.jsx";
import Home from "./Pages/Home/Home.jsx";

import Login from "./Pages/Login/Login..jsx";
import Register from "./Pages/Register/Register.jsx";
import MyProfile from "./Pages/MyProfile/Myprofile.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import AdminStatistics from "./components/Deshboard/statistics/AdminStatistics.jsx";
import Statistics from "./Pages/Dashboard/Common/Statistics.jsx";
import AddProduct from "./Pages/Dashboard/Seller/AddProduct.jsx";
import MyInventory from "./Pages/Dashboard/Seller/MyInventory.jsx";
import ManageUsers from "./Pages/Dashboard/Admin/ManageUsers.jsx";
import MyOrder from "./Pages/Dashboard/Customer/MyOrder.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageOrders from "./Pages/Dashboard/Seller/ManageOrders.jsx";
import BecomeSeller from "./Pages/Dashboard/Common/BecomeSeller.jsx";
import SellerRoute from "./privateRoute/SellerRoute.jsx";
import AdminRoute from "./privateRoute/AdminRoute.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs> ,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/register",
        element:<Register></Register>,
      },
      {
        path: "/myprofile",
        element: <PrivateRoute> <MyProfile></MyProfile> </PrivateRoute>
      },
      {
        path: "/cart",
        element: <PrivateRoute> <MyOrder></MyOrder> </PrivateRoute>
       },
      {
        path: "/productDetails/:id",
        element: <PrivateRoute> <ProductDetails></ProductDetails> </PrivateRoute>
      },
        {
        path: "/dashboard",
        element:<PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
       children: [
         {
          path: "statistics",
          element: <PrivateRoute> <AdminRoute><Statistics></Statistics></AdminRoute> </PrivateRoute>
         },
         {
          path: "add-product",
          element: <PrivateRoute> <SellerRoute><AddProduct></AddProduct></SellerRoute>  </PrivateRoute>
         },
         {
          path: "my-invetory",
          element: <PrivateRoute> <SellerRoute> <MyInventory></MyInventory></SellerRoute> </PrivateRoute>
         },
         {
          path: "manage-users",
          element: <PrivateRoute>  <AdminRoute><ManageUsers></ManageUsers></AdminRoute>  </PrivateRoute>
         },
       
         {
          path: "manage-orders",
          element: <PrivateRoute> <SellerRoute><ManageOrders></ManageOrders></SellerRoute>  </PrivateRoute>
         },
         {
          path: "become-a-seller",
          element: <PrivateRoute> <BecomeSeller></BecomeSeller> </PrivateRoute>
         },

        ],
       },
      
    ],
  },

]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} /> 
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
