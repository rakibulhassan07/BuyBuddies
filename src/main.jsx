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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        path: "/productDetails/:id",
        element: <PrivateRoute> <ProductDetails></ProductDetails> </PrivateRoute>
      },
        {
        path: "/dashboard",
        element:<PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
       children: [
         {
             index:true,
             element: <PrivateRoute> <Statistics></Statistics> </PrivateRoute>
         },
         {
          path: "add-product",
          element: <PrivateRoute> <AddProduct></AddProduct> </PrivateRoute>
         },
         {
          path: "my-invetory",
          element: <PrivateRoute> <MyInventory></MyInventory> </PrivateRoute>
         },
         {
          path: "manage-users",
          element: <PrivateRoute> <ManageUsers></ManageUsers> </PrivateRoute>
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
