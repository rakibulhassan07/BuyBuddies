import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const MyProfile = () => {
    const {user}=useContext(AuthContext);
    console.log(user);

    return (
        <div className='flex flex-col items-center  space-y-4 md:p-32 h-screen'> 
            <img className="w-32 h-32 rounded-full object-cover"
              src={user?.photoURL}
              alt="User Profile"   
            />
            <h2 className='text-lg font-bold'>Name: {user.displayName}</h2>
            <h2 className='text-lg font-bold'>Email: {user.email}</h2>
            
        </div>
    );
};

export default MyProfile; 