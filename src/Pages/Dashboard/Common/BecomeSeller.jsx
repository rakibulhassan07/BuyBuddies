import React, { useContext } from "react";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

import { AuthContext } from "../../../provider/AuthProvider";
import useUsers from "../../../Hook/useUsers";

const BecomeSeller = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users] = useUsers();
  const { user } = useContext(AuthContext);
  
  const customerData = users?.find((userEmail) => userEmail?.email === user?.email);
  
  const handleBecomeSeller = async () => {
    const userId = customerData.id;
    try {
        const response = await fetch('http://localhost/BuyBuddies/index.php/api/users/seller-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            role: 'pending_seller'
          })
        });
        
        if (response.ok) {
          alert('Seller request sent successfully!');
          setIsOpen(false);
        } else {
          alert('Failed to send seller request');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error sending request');
      }
  }

  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div className="max-w-md  p-6  rounded-lg shadow-2xl text-center">
        <p className="text-xl font-bold mb-4">Become A Seller!</p>
        <p className="text-gray-600 text-left mb-4">
          Please read all the terms & Conditions before becoming a seller
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Become A Seller
        </button>
        
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title className="text-xl font-bold mb-4">
                Become A Seller
              </Dialog.Title>
              
              <Dialog.Description className="text-gray-600 mb-6">
                Please read all the terms & Conditions before becoming a seller
              </Dialog.Description>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleBecomeSeller}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default BecomeSeller;