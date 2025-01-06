import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

function PurchaseModal({ isOpen, setIsOpen, product }) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg space-y-4 border bg-[linear-gradient(90deg,_#e7ffd9_0%,_#d9d3ff_100%)] p-12">
          <DialogTitle className="text-2xl font-bold">Confirm Purchase</DialogTitle>
          <Description className="text-gray-600">
            Please confirm your purchase details
          </Description> 
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold">Product Details:</h3>
              <p>Name: {product.product_name}</p>
              <p>Price: ${product.product_price}</p>
              <p>Quantity Available: {product.product_quantity}</p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setIsOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Add purchase logic here
                  setIsOpen(false)
                }}
                className="btn btn-primary"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default PurchaseModal;