import React, { useState, useEffect } from 'react';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import DonationCampCart from '../../components/DonationCampCart';
import Loading from '../../shared/Loading';

const DonationCampaign = () => {
    const { myDonationCampaign, isLoading } = useDonationCampagin();
    const [selectedSort, setSelectedSort] = useState('newest'); // default sort order is 'newest'
    const [sortedCampaigns, setSortedCampaigns] = useState([]);

    useEffect(() => {
        const sortedData = [...myDonationCampaign].sort((a, b) => {
            if (selectedSort === 'newest') {
                return new Date(b.campaignCreatedTime) - new Date(a.campaignCreatedTime); // Newest first
            } else {
                return new Date(a.campaignCreatedTime) - new Date(b.campaignCreatedTime); // Oldest first
            }
        });
        setSortedCampaigns(sortedData);
    }, [myDonationCampaign, selectedSort]);

    if (isLoading) return <p className="min-h-[calc(100vh-393px)]"><Loading></Loading></p>;

    return (
        <div className="min-h-[calc(100vh-393px)] bg-gray-200 dark:bg-[#181818]">
            {/* Sorting Dropdown */}
            <div className="flex justify-center gap-5 py-5">
                <select
                    className={`px-4 py-2 rounded-xl ${selectedSort === 'newest' ? 'bg-[#bbdefb] text-black' : 'bg-[#181818] text-white'}`}
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            {/* Campaign Cards */}
            <div className='grid sm:grid-cols-2 mt-10 lg:grid-cols-3 gap-2 px-6 sm:px-0 md:px-2 lg:px-4 container mx-auto'>
                {
                    sortedCampaigns.length > 0
                        ? sortedCampaigns.map(data => <DonationCampCart key={data._id} data={data}></DonationCampCart>)
                        : <p className="text-center text-xl text-gray-600">No campaigns available.</p>
                }
            </div>
        </div>
    );
};

export default DonationCampaign;
