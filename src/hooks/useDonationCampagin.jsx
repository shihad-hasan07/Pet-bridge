import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { allContext } from '../authprovider/Authprovider';
import { useQuery } from '@tanstack/react-query';

const useDonationCampagin = () => {
    const { user } = useContext(allContext)
    const axiosSecure = useAxiosSecure()

    const { data: myDonationCampaign = [], refetch, isLoading } = useQuery({
        queryKey: ['donation-campaing', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-campaign')
            // const filtedData = res.data.filter(data => user.email == data.campaignOwner)
            const filtedData = res.data
            return filtedData
        }
    });

    return { myDonationCampaign, refetch, isLoading }
};

export default useDonationCampagin;