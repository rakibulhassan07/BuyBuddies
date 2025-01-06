import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import BreakingNews from "../Pages/Home/Breaking";
import Footer from "../Shared/Navbar/Footer";

const Root = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className="bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] ">
          <Outlet></Outlet>
        </div>
       
      
    </div>
  );
};

export default Root;
