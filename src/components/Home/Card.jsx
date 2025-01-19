import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  const {
    product_photo,
    product_name,
    product_price,
    product_details,
    product_quantity,
    id,
  } = product;

  const cardStyle = {
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
    animation: 'card-hover 0.5s ease-in-out',
  };

  const hoverStyle = {
    transform: 'rotateY(10deg) scale(1.05)',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
  };

  const animationKeyframes = `
    @keyframes card-hover {
      0% {
        transform: rotateY(0) scale(1);
      }
      50% {
        transform: rotateY(10deg) scale(1.05);
      }
      100% {
        transform: rotateY(0) scale(1);
      }
    }
  `;

  return (
    <div className="w-96">
      <style>{animationKeyframes}</style> {/* Inline keyframes */}
      <Link to={`/productDetails/${id}`}>
        <div
          className="card bg-base-100 shadow-xl group h-[600px] flex flex-col"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotateY(10deg) scale(1.05)';
            e.currentTarget.style.boxShadow = '0px 20px 40px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <figure className="px-10 pt-10 h-64 overflow-hidden">
            <img
              src={product_photo}
              alt={product_name}
              className="rounded-xl w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
          </figure>
          <div className="card-body items-center text-center flex-1 flex flex-col">
            <h2 className="font-bold text-2xl line-clamp-2">{product_name}</h2>
            <h2 className="font-bold text-xl">Price: ${product_price}</h2>
            <h2 className="font-bold text-xl">Quantity: {product_quantity}</h2>
            <p className="text-lg line-clamp-3 flex-1">{product_details}</p>
            <div className="card-actions mt-auto">
              <Link to={`/productDetails/${id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
