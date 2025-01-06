import React from "react";
import { Link} from "react-router-dom";

const Card = ({product}) => {
  const {product_photo, product_name, product_price, product_details, product_quantity,id }=product
  
  return (
    <Link to={`/productDetails/${id}`}>
     <div className="card bg-base-100 w-96 shadow-xl group">
  <figure className="px-10 pt-10">
    <img
      src={product_photo}
      alt="Shoes"
      className="rounded-xl group-hover:scale-110 transition" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="font-bold text-3xl">{product_name}</h2>
    <h2 className="font-bold text-2xl">Price{product_price}</h2>
    <h2 className="font-bold text-2xl">Quantity:{product_quantity}</h2>
    <p  className=" text-2xl">{product_details}</p>
    
    <div className="card-actions">
        <Link to={`/productDetails/${id}`} className="btn btn-primary">Details</Link>
     
    </div>
  </div>
</div>
    </Link>
   
  );
};

export default Card;
