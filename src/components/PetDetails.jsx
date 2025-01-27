import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from '../hooks/useAxiosPublic'

const PetDetails = () => {
    const param = useParams()

    const { data: details = {} } = useQuery({
        queryKey: ['pet-details'],
        queryFn: async () => {
            const res = await useAxiosPublic.get(`pet-details/${param.id}`)
            return res.data
        }
    })

    // console.log('details',details)

    return (
        <div>
            {
                details?._id
            }

        </div>
    );
};

export default PetDetails;
