import React, { useContext } from 'react';
import { allContext } from '../authprovider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(allContext)
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isLoading: isAdminloading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],

        queryFn:async ()=>{
            const res=await axiosSecure.get(`user`)
        }
    })


    return <div></div>
};

export default AdminRoute;