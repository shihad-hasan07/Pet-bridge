import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PetDetails = () => {
    const param = useParams()
    const axiosPublic = useAxiosPublic()

    const { data: details = [], isLoading, isError, error } = useQuery({
        queryKey: [`pet-details`],
        queryFn: async () => {
            const res = await axiosPublic.get(`/pet-details/${param.id}`)
            return res.data
        }
    })
    
    if (isLoading) return <p className="text-7xl bg-blue-800 w-full">Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const { _id, name } = details
    return (
        <div className="text-4xl">
            {name}
            {
                _id
            }

        </div>
    );
};

export default PetDetails;
