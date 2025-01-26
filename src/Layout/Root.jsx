import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import BreakingNews from "../Pages/Home/Breaking";
import Footer from "../Shared/Navbar/Footer";

const Root = () => {
  return (
    <div>
        <Navbar></Navbar>
        <BreakingNews></BreakingNews>
        <div className="bg-[linear-gradient(135deg,_#FFDEE9_0%,_#B5FFFC_100%)] ">
          <Outlet></Outlet>
        </div>
    </div>
  );
};

export default Root;
