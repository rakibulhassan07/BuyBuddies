import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom'; // Added Navigate import
import useUsers from '../Hook/useUsers';
import { AuthContext } from '../provider/AuthProvider';

const SellerRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    const [users] = useUsers();
    const userExist = users.find((userEmail) => userEmail.email === user.email);
    const location = useLocation();
    if(userExist?.role === 'seller'){
        return children;
    }

    // Changed the redirect path to root dashboard path
    return <Navigate to="/dashboard" state={location.pathname} replace />;
};

export default SellerRoute;