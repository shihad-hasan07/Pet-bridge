import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { allContext } from '../authprovider/Authprovider';
import Lottie from 'lottie-react';
import loadingLottie from '../assets/lottie/loading.json'
import Loading from '../shared/Loading';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(allContext)

    const location = useLocation()

    if (loading) {
        return <Loading></Loading>

    }

    if (user) {
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;