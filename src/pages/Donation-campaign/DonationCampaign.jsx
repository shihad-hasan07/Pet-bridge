import React from 'react';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import DonationCampCart from '../../components/DonationCampCart';
import Loading from '../../shared/Loading';

const DonationCampaign = () => {
    const { myDonationCampaign, isLoading } = useDonationCampagin()
    const sortedPets = myDonationCampaign.sort((a, b) => new Date(b.campaignCreatedTime) - new Date(a.campaignCreatedTime));

    console.log('cmap', myDonationCampaign);
    if (isLoading) return <p className="min-h-[calc(100vh-393px)]"><Loading></Loading></p>;
    return (
        <div className='min-h-[calc(100vh-393px)]'>

            <div className='grid sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-2 container mx-auto'>
                {
                    myDonationCampaign.map(data => <DonationCampCart key={data._id} data={data}></DonationCampCart>)
                }
            </div>
        </div>
    );
};

export default DonationCampaign;