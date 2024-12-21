import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Layout/Root.jsx";
import Home from "./Pages/Home/Home.jsx";
import Logi from "./Pages/Login/Login..jsx";
import Login from "./Pages/Login/Login..jsx";
import Register from "./Pages/Register/Register.jsx";
import MyProfile from "./Pages/MyProfile/MyProfile..jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import PrivateRoute from "./privateRoute/PrivateRoute.jsx";

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
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} /> 
    </AuthProvider>
  </StrictMode>
);
