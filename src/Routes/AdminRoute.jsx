import React, { useContext } from 'react';
import { allContext } from '../authprovider/Authprovider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(allContext)
    const axiosPublic = useAxiosPublic()
    const { data: isAdmin, isLoading: isAdminloading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],

        queryFn:async ()=>{
            const res=await axiosPublic.get(`user`)
        }
    })


    return <div></div>
};

export default AdminRoute;