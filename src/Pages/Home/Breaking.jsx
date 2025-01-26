import React from "react";
import Marquee from "react-fast-marquee";
const BreakingNews = () => {
  return (
    <div className="flex p-2 bg-orange-500">
    
      <Marquee pauseOnHover={true} speed={100}>
       <p className="font-bold text-white"> Whole January 10% off on all products</p>
      </Marquee>
    </div>
  );
};

export default BreakingNews;