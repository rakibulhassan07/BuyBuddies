import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useOrder from "../../../Hook/useOrder";
import useProducts from "../../../Hook/useProducts";
import useUsers from "../../../Hook/useUsers";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUsers();
  const [orders] = useOrder();
  const [products] = useProducts();
  const customerData = users?.find(
    (userEmail) => userEmail?.email === user?.email
  );
  //    console.log(customerData.id);
  const useOrdered = orders?.filter(
    (userProducts) => userProducts?.user_id === customerData?.id
  );
  return (
    <div className="max-w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold uppercase text-center m-5"></h1>

      <table className="w-[100%]">
        <tr>
          <th className="text-left">image</th>
          <th>name</th>
          <th> price</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

        {useOrdered.map((orders) => ( 
          <tr className="text-center " key={orders.id}>
            <td className="p-3">
              <img className="w-24" src={orders?.product_photo} alt="" />
            </td>
            <td className="p-3">{orders?.product_name}</td>
            <td className="p-3">{orders?.price}</td>
            <td className="p-3">{orders?.quantity}</td>
            <td className="p-3 text-red-700 ">{orders?.status}</td>
            <td className="p-3">
              {orders?.status === "pending" && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
                >
                  Cancel Order
                </button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default MyOrder;
