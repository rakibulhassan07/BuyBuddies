import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../Hook/useProducts';
import PurchaseModal from '../../components/Model/PurchaseModal';
import useReviews from '../../Hook/useReviews';
import useUsers from '../../Hook/useUsers';


const ProductDetails = () => {
    const { id } = useParams();
    const [products] = useProducts();
    const [reviews]=useReviews();
    const [users]=useUsers();
    
    const [isOpen, setIsOpen] = useState(false);
    const matchId = products.find((product) => product.id === id);
    const filteredreviews = reviews.filter(review =>review.product_id===matchId.id);
    
    if (!matchId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-600">Product Not Found</h2>
                </div>
            </div>
        );
    }
    const StarRating = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <span 
                            key={index} 
                            className={`text-xl ${
                                ratingValue <= rating 
                                    ? 'text-yellow-500' 
                                    : 'text-gray-300'
                            }`}
                        >
                            ★
                        </span>
                    );
                })}
            </div>
        );
    };
    return (
        <div className="min-h-screen bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] from-gray-50 to-white py-12 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/2 p-8 bg-gray-50">
                        <div className="group relative">
                            <img
                                src={matchId.product_photo}
                                className="w-full h-[500px] object-cover rounded-xl shadow-md transform group-hover:scale-105 transition-transform duration-300"
                                alt={matchId.product_name}
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:w-1/2 p-8 flex flex-col">
                        <div className="flex-1">
                            {/* Header */}
                            <div className="border-b pb-4">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {matchId.product_name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-bold text-blue-600">
                                        ${matchId.product_price}
                                    </span>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="mt-6 flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${
                                    matchId.product_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                                }`}></div>
                                <span className="text-lg font-medium">
                                    {matchId.product_quantity > 0 
                                        ? `In Stock (${matchId.product_quantity} units available)` 
                                        : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Product Details */}
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        {matchId.product_details}
                                    </p>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <span className="block text-sm font-medium text-blue-600">Price</span>
                                    <span className="block text-lg font-semibold">${matchId.product_price}</span>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <span className="block text-sm font-medium text-green-600">Availability</span>
                                    <span className="block text-lg font-semibold">{matchId.product_quantity} units</span>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Button */}
                        <div className="mt-8">
                            {matchId.product_quantity > 0 ? (
                                <button 
                                    onClick={() => setIsOpen(true)}
                                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                   ADD To Cart
                                </button>
                            ) : (
                                <button 
                                    className="w-full bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
                                    disabled
                                >
                                    Out of Stock
                                </button>
                            )}
                            
                        </div>
                    </div>
                    
                </div>
               <div className='text-center mt-8 pl-8 pr-8'>
                <h2 className='text-2xl font-semibold mb-8'>CUSTOMER REVIEW</h2>
                {filteredreviews.length === 0 ? (
                        <p className="text-gray-500 italic">No reviews yet for this product</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                            {filteredreviews.map((review, index) => (
                                <div 
                                    key={index} 
                                    className="bg-gray-50 rounded-xl p-6 shadow-md"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-semibold">{review.name}</h3>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-700 italic text-sm">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
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