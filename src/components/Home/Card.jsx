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

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  // Handle mouse leave
  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div className="w-96">
      <div
        className="relative bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.2] rounded-xl p-6 h-[600px] flex flex-col transform-gpu transition-all duration-300 ease-out hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-full mt-4" style={{ transform: "translateZ(100px)" }}>
          <img
            src={product_photo}
            alt={product_name}
            className="h-60 w-full object-cover rounded-xl shadow-md group-hover:shadow-xl"
          />
        </div>
        <h2
          className="text-2xl text-center mt-3 font-bold text-neutral-600 dark:text-white line-clamp-2"
          style={{ transform: "translateZ(50px)" }}
        >
          {product_name}
        </h2>

        <div
          className="mt-4 space-y-2"
          style={{ transform: "translateZ(60px)" }}
        >
          <p className="text-xl font-bold text-neutral-600 dark:text-white">
            Price: ${product_price}
          </p>
          <p className="text-xl font-bold text-neutral-600 dark:text-white">
            Quantity: {product_quantity}
          </p>
          <p
            className="text-neutral-500 text-lg mt-2 dark:text-neutral-300 line-clamp-2"
            style={{ transform: "translateZ(60px)" }}
          >
            {product_details}
          </p>
        </div>

        <div
          className="mt-auto flex justify-between items-center"
          style={{ transform: "translateZ(20px)" }}
        >
          <Link
            to={`/productDetails/${id}`}
            className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Buy Now
          </Link>
        </div>
      </div>

      <style jsx>{`
        @property --rotate-x {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @property --rotate-y {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </div>
  );
};

export default Card;
