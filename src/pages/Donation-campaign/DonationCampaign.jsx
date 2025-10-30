import React, { useState, useEffect } from 'react';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import DonationCampCart from '../../components/DonationCampCart';
import Loading from '../../shared/Loading';
import { FaSortAmountDown, FaSortAmountUp, FaFilter } from 'react-icons/fa';

const DonationCampaign = () => {
    const { myDonationCampaign, isLoading } = useDonationCampagin();
    const [selectedSort, setSelectedSort] = useState('newest');
    const [sortedCampaigns, setSortedCampaigns] = useState([]);

    useEffect(() => {
        const sortedData = [...myDonationCampaign].sort((a, b) => {
            if (selectedSort === 'newest') {
                return new Date(b.campaignCreatedTime) - new Date(a.campaignCreatedTime);
            } else {
                return new Date(a.campaignCreatedTime) - new Date(b.campaignCreatedTime);
            }
        });
        setSortedCampaigns(sortedData);
    }, [myDonationCampaign, selectedSort]);

    if (isLoading) return <p className="min-h-[calc(100vh-393px)]"><Loading></Loading></p>;

    return (
        <div className="min-h-[calc(100vh-393px)] bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 shadow-lg">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                        Donation Campaigns
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
                        Support our causes and make a difference in the lives of pets in need
                    </p>

                    {/* Campaign Count Badge */}
                    <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
                        <span className="text-white font-semibold text-sm sm:text-base">
                            {sortedCampaigns.length} Active Campaign{sortedCampaigns.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sorting Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                            <FaFilter className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sort By</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Campaign Date</p>
                        </div>
                    </div>

                    {/* Sort Buttons */}
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setSelectedSort('newest')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedSort === 'newest'
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            <FaSortAmountDown size={16} />
                            <span className="text-sm sm:text-base">Newest</span>
                        </button>

                        <button
                            onClick={() => setSelectedSort('oldest')}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedSort === 'oldest'
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            <FaSortAmountUp size={16} />
                            <span className="text-sm sm:text-base">Oldest</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Campaign Cards Grid */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12'>
                {sortedCampaigns.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8'>
                        {sortedCampaigns.map(data => (
                            <DonationCampCart key={data._id} data={data} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 sm:py-20 lg:py-24">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 max-w-md mx-auto">
                            <div className="bg-gray-100 dark:bg-gray-700 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                No Campaigns Available
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                                There are currently no donation campaigns. Check back later!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationCampaign;