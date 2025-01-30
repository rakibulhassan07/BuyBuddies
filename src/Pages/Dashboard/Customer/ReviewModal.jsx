import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewModal = ({ isOpen, setIsOpen, selectedOrder, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  
  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast.error('Please select a rating', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REAC_APP_BACKEND_URL}/reviews`, 
        {
          order_id: selectedOrder.id,
          product_id: selectedOrder.product_id,
          rating: rating,
          comment: comment
        }
      );

      if (response.data.message) {
        toast.success('Review submitted successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
        onReviewSubmit(selectedOrder.id);
        setIsOpen(false);
        // Reset form
        setRating(0);
        setComment('');
      } else {
        toast.error('Failed to submit review', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review: ' + (error.response?.data?.error || 'Unknown error'), {
        position: "top-center",
        autoClose: 3000,
      });
    }
    
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[10vh]"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="relative bg-white rounded-lg max-w-md mx-auto p-6 shadow-xl">
        <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900">
          Review {selectedOrder?.product_name}
        </Dialog.Title>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">Rate your experience:</p>
          <div className="flex">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <FaStar
                  key={index}
                  className={`
                    ${index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}
                    cursor-pointer transition-colors duration-200
                  `}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  size={30}
                />
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Review:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="4"
            placeholder="Share your thoughts about the product..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitReview}
            className="bg-orange-600  text-white px-4 py-2 rounded-lg  transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewModal;