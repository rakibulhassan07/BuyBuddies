import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useUsers from '../../../Hook/useUsers';

import { ToastContainer } from 'react-toastify';
import useProducts from '../../../Hook/useProducts';
import { CgLayoutGrid } from 'react-icons/cg';

const MyInventory = () => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers();
    const [products, setproducts] = useProducts();
    const customerData = users?.find(
        (userEmail) => userEmail?.email === user?.email
      );
      const useProduct = products?.filter(
        (userProducts) => userProducts?.user_id === customerData?.id
      );
     
    console.log(useProduct);
      return (
           <div className="max-w-[80%] mx-auto">
                {/* ToastContainer for showing notifications */}
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                 
                <h1 className="text-2xl font-semibold uppercase text-center m-5">My Orders</h1>
          
                <table className="w-[100%]">
                  <thead>
                    <tr>
                      <th className="text-left">Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                 <tbody>
                    {useProduct.map((prduct) => ( 
                      <tr className="text-center" key={prduct.id}>
                        <td className="p-3">
                          <img className="w-20" src={prduct?.product_photo} alt="" />
                        </td>
                        <td className="p-3">{prduct?.product_name}</td>
                        <td className="p-3">{prduct?.product_price}</td>
                        <td className="p-3">{prduct?.product_quantity}</td>
                        <td className="p-3">
                          
                            <button
                              onClick={() => handleCancel(prduct.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                            >
                             Delete Product
                            </button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody> 
                </table>
              </div>
      );
};

export default MyInventory;