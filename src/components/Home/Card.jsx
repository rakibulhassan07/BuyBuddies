import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl group">
  <figure className="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      className="rounded-xl group-hover:scale-110 transition" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions">
        <Link to="/productDetails" className="btn btn-primary">Details</Link>
     
    </div>
  </div>
</div>
  );
};

export default Card;
