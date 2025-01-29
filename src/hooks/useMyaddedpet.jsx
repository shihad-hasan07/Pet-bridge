import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { allContext } from "../authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";

const useMyaddedpet = () => {
    const {user}=useContext(allContext)
    const axiosSecure=useAxiosSecure()
    
    const { data: myAddedpets = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: ['myAddedpets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-added-pets?email=${user.email}`);
            return res.data;
        }
    });


    return {myAddedpets,refetch,isLoading}
};

export default useMyaddedpet;