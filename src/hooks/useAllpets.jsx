import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


// only admin cat see all pets info add upadte 

const useAllpets = (id) => {
    const axiosSecure = useAxiosSecure()

    const { data: allpets = [], refetch, isLoading } = useQuery({
        queryKey: ['allpet'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-pets')
            return res.data
        }
    })
    return { allpets, refetch, isLoading }
};

export default useAllpets;