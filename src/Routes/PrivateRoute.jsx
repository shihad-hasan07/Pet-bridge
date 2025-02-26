import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { allContext } from '../authprovider/Authprovider';
import Lottie from 'lottie-react';
import loadingLottie from '../assets/lottie/loading.json'

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(allContext)

    const location = useLocation()

    if (loading) {
        return <div>
            {/* <p className='text-center text-7xl bg-blue-500'>Loading....</p> */}
            <div className="absolute inset-0">
                <Lottie animationData={loadingLottie} className="w-full h-full" />
            </div>

        </div>
    }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;