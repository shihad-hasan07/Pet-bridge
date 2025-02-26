import React from 'react';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import DonationCampCart from '../../components/DonationCampCart';

const DonationCampaign = () => {
    const {myDonationCampaign}=useDonationCampagin()

    return (
        <div>

            <div className='grid sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-2 container mx-auto'>
                {
                    myDonationCampaign.map(data=><DonationCampCart key={data._id} data={data}></DonationCampCart>)
                }
            </div>
        </div>
    );
};

export default DonationCampaign;