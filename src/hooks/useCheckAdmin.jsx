import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { allContext } from '../authprovider/Authprovider';

const useCheckAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(allContext)

    const { data: checkAdmin = "" } = useQuery({
        queryKey: ['is admin', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-check-admin?email=${user?.email}`)
            return res.data
        }
    })
    return { checkAdmin }
};

export default useCheckAdmin;