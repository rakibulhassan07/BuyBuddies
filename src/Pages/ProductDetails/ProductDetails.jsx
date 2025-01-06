import React from 'react';
import { CgLayoutGrid } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hook/useProducts';

const ProductDetails = () => {
    const {id} = useParams()
    const [products]= useProducts();
    
    const matchId = products.find((userId) => userId.id === id);
    

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-24">
                <img
                    src={matchId.product_photo}
                    className="w-96 rounded-lg shadow-2xl" 
                    alt="Product"
                />
                <div className="">
                    <h1 className="text-5xl font-bold">{matchId.product_name}</h1>
                    <p className="py-6">
                        {matchId.product_details}
                    </p>
                    <p className="py-6">
                       price: {matchId.product_price
                        }
                    </p>
                    <p className="py-6">
                       Quantity: {matchId.product_quantity
                        }
                    </p>
                    
                    <button className="btn btn-primary">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;