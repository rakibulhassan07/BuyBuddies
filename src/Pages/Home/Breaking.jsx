import React from "react";
import Marquee from "react-fast-marquee";
const BreakingNews = () => {
  return (
    <div className="flex p-2  bg-slate-300 ">
    
      <Marquee pauseOnHover={true} speed={100}>
        WELCOME TO OUR BUYBUDDIES
      </Marquee>
    </div>
  );
};

export default BreakingNews;