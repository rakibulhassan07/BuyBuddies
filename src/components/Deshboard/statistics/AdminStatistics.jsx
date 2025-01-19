import React from 'react';
import useUsers from '../../../Hook/useUsers';
import useProducts from '../../../Hook/useProducts';
import useOrder from '../../../Hook/useOrder';
import Chart from '../../Chart/Chart';
import { div } from 'framer-motion/client';

const AdminStatistics = () => {
    const [users] = useUsers();
    const [products] = useProducts();
    const [orders] = useOrder();
    
    const totalUsers = users?.length || 0;
    const totalProducts = products?.length || 0;
    const totalOrders = orders?.length || 0;
    
    // Calculate total order price
    const totalOrderPrice = orders?.reduce((total, order) => {
        const orderTotal = order.price * order.quantity;
        return total + orderTotal;
    }, 0) || 0;

    return (
        <div>
            <div className="bg-orange-500 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-700">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-800">{totalUsers}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-green-700">Total Products</h3>
                    <p className="text-3xl font-bold text-green-800">{totalProducts}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-700">Total Orders</h3>
                    <p className="text-3xl font-bold text-purple-800">{totalOrders}</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-red-700">Total Revenue</h3>
                    <p className="text-3xl font-bold text-red-800">
                        ${totalOrderPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2
                        })}
                    </p>
                </div>
            </div>

            
        </div>
        <Chart></Chart>
        </div>
        
    );
};

export default AdminStatistics;