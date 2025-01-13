import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hook/useProducts';
import PurchaseModal from '../../components/Model/PurchaseModal';

const ProductDetails = () => {
    const { id } = useParams();
    const [products] = useProducts();
    const [isOpen, setIsOpen] = useState(false);

  
    const matchId = products.find((product) => product.id === id);
 

    if (!matchId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
               
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-24">
                <img
                    src={matchId.product_photo}
                    className="w-96 rounded-lg shadow-2xl" 
                    alt={matchId.product_name}
                />
                <div className="">
                    <h1 className="text-5xl font-bold">{matchId.product_name}</h1>
                    <p className="py-6">
                        {matchId.product_details}
                    </p>
                    <p className="py-6">
                        Price: {matchId.product_price}
                    </p>
                    <p className="py-6">
                        Quantity: {matchId.product_quantity}
                    </p>
                    
                    {matchId.product_quantity > 0 ? (
                        <button 
                            className="btn btn-primary"
                            onClick={() => setIsOpen(true)}
                        >
                            Purchase
                        </button>
                    ) : (
                        <button className="btn btn-disabled bg-gray-500 text-white cursor-not-allowed hover:bg-gray-500">
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>

            <PurchaseModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                product={matchId}
            />
        </div>
    );
};

export default ProductDetails;