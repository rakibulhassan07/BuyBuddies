import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useUsers from '../../Hook/useUsers';
import { CgLayoutGrid } from 'react-icons/cg';
import { FaRegListAlt } from 'react-icons/fa';
import useOrder from '../../Hook/useOrder';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers();
    const userExist = users.find((userEmail) => userEmail.email === user.email);
    const getRoleBadge = (role) => {
        const badges = {
            admin: "bg-purple-100 text-purple-800 border-purple-200",
            seller: "bg-green-100 text-green-800 border-green-200",
            pending_seller: "bg-yellow-100 text-yellow-800 border-yellow-200",
            pending_admin: "bg-orange-100 text-orange-800 border-orange-200",
            customer: "bg-blue-100 text-blue-800 border-blue-200"
        };

        const roleLabels = {
            admin: "Admin",
            seller: "Seller",
            pending_seller: "Pending Seller Approval",
            pending_admin: "Pending Admin Approval",
            customer: "Customer"
        };

        return (
            <div className={`px-4 py-2 rounded-full border ${badges[role] || badges.customer}`}>
                {roleLabels[role] || "Customer"}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#f0f4f8] to-[#d6e1f4] py-12">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-6">
                    <div className="relative">
                        <img
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            src={user?.photoURL || 'https://via.placeholder.com/128'}
                            alt="User Profile"
                        />
                    </div>

                    <div className="text-center lg:text-left space-y-3">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {user.displayName || 'User Name'}
                        </h1>
                        <p className="text-gray-600">{user.email}</p>
                        
                        {userExist && (
                            <div className="mt-4">
                                {getRoleBadge(userExist.role)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Account Overview</h2>
                  
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
