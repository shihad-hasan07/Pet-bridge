import React, { useContext } from 'react';
import { allContext } from '../../authprovider/Authprovider';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Dash_User = () => {
    const { user, logOut } = useContext(allContext);

    return (
        <div className='bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-60px)] flex flex-col items-center py-10 px-4 sm:px-6'>
            <div className='w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'>
                <p className='bg-blue-600 text-white py-4 text-center text-2xl font-semibold tracking-wide'>Profile</p>
                <div className='flex flex-col items-center py-8 px-6'>
                    <img 
                        src={user?.photoURL || 'https://via.placeholder.com/150'} 
                        alt="User" 
                        className='w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md border-4 border-gray-200 dark:border-gray-600' 
                    />
                    <div className='text-center mt-5 space-y-2'>
                        <p className='text-lg sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2'>
                            <FaUserCircle /> {user?.displayName || 'No Name'}
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2'>
                            <FaEnvelope /> {user?.email || 'No Email'}
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2'>
                            <FaPhone /> {user?.phoneNumber || 'No Phone'}
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2'>
                            <FaMapMarkerAlt /> {user?.address || 'No Address'}
                        </p>
                    </div>
                </div>
                <div className='border-t px-6 py-4 bg-gray-50 dark:bg-gray-700'>
                    <h3 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center sm:text-left'>Additional Info</h3>
                    <p className='text-gray-600 dark:text-gray-400 flex items-center gap-2 justify-center sm:justify-start'>
                        <FaClock /> Joined: <span className='font-medium'>{user?.joinedAt || 'Unknown'}</span>
                    </p>
                    <p className='text-gray-600 dark:text-gray-400 flex items-center gap-2 justify-center sm:justify-start'>
                        <FaClock /> Last Login: <span className='font-medium'>{user?.lastLogin || 'Unknown'}</span>
                    </p>
                </div>
                <div className='border-t px-6 py-4 flex flex-col sm:flex-row justify-between bg-gray-100 dark:bg-gray-800 gap-4 sm:gap-0'>
                    <button className='w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition'>
                        Edit Profile
                    </button>
                    <button onClick={() => logOut()} className='w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dash_User;
