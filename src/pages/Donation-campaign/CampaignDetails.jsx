import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button, Input } from '@material-tailwind/react';
import ProgressBar from "@ramonak/react-progress-bar";
import formatDate from '../../components/formatDate/formatDate'
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../CheckoutForm/CheckoutForm';
import { FaHeart, FaCalendarAlt, FaUser, FaDonate, FaHandHoldingHeart, FaBullseye, FaClock } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
Modal.setAppElement('#root');

const CampaignDetails = () => {
    const id = useParams().id
    const axiosSecure = useAxiosSecure()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [donateBalance, setDonateBalance] = useState()

    const { data: details = {}, refetch } = useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaign-details/${id}`)
            return res.data
        }
    })

    const { lastDateofDonation, maxDonationAmount, totalDonation, pauseDonation } = details;
    const [baseError, setbaseError] = useState('')
    const date = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (pauseDonation) {
            setbaseError('Donation paused by user');
            return
        }

        if (lastDateofDonation < date) {
            setbaseError('Time over');
            return;
        }

        if ((maxDonationAmount - totalDonation) < (donateBalance / 100)) {
            setbaseError('Donation limit exceeded');
            return;
        }

        if (donateBalance < 50 || donateBalance > 999999.99) {
            setbaseError('Donation amount should be 50 paisa to 9999999.99');
            return;
        }

        setbaseError('');

    }, [lastDateofDonation, date, maxDonationAmount, totalDonation, donateBalance, pauseDonation]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Be Their Hero – Give Love, Give Hope, Give a Home!
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Your generosity provides food, shelter, and care to homeless pets.<br className="hidden sm:block" />
                        Every donation brings them closer to a loving home!
                    </p>
                </div>

                {/* Hero Image Section */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6 sm:mb-8 group">
                    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
                        <img
                            src={details.image}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={details?.name}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Status Badge */}
                        {pauseDonation && (
                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                                ⏸ Paused
                            </div>
                        )}

                        {maxDonationAmount === totalDonation && (
                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                                ✓ Completed
                            </div>
                        )}

                        {/* Progress Badge */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                            <span className="text-blue-600 dark:text-blue-400">
                                {((totalDonation / maxDonationAmount) * 100).toFixed(0)}% Funded
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                            <div className="flex-1">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700 dark:text-red-500 mb-3 sm:mb-4 first-letter:capitalize">
                                    {details?.name}
                                </h2>
                                <p className="text-base sm:text-xl text-gray-700 dark:text-gray-300 first-letter:capitalize">
                                    {details?.sortDescription}
                                </p>
                            </div>
                        </div>

                        {/* Campaign Stats */}
                        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 sm:p-6 border border-blue-100 dark:border-blue-800">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                        <FaBullseye className="text-blue-600 dark:text-blue-400" size={20} />
                                    </div>
                                    <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                                        Goal Amount
                                    </p>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white ml-14">
                                    {details?.maxDonationAmount} tk
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 sm:p-6 border border-green-100 dark:border-green-800">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                        <FaHandHoldingHeart className="text-green-600 dark:text-green-400" size={20} />
                                    </div>
                                    <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                                        Collected Amount
                                    </p>
                                </div>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white ml-14">
                                    {details?.totalDonation} tk
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <ProgressBar 
                                completed={((details?.totalDonation / details?.maxDonationAmount) * 100).toFixed(2)} 
                                className="border-2 border-purple-600 dark:border-purple-500 rounded-full" 
                                maxCompleted={100} 
                                bgColor="#6a1b9a"
                                height="20px"
                                labelClassName="font-semibold"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-6 sm:mx-8 lg:mx-10"></div>

                    {/* Campaign Info */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-3">
                            <FaHeart className="text-red-500" />
                            Campaign Details
                        </h3>

                        {/* Description */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 sm:p-6 mb-6">
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                Description
                            </h4>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed first-letter:capitalize">
                                {details?.fullDesciption}
                            </p>
                        </div>

                        {/* Campaign Meta Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                        <FaUser className="text-blue-600 dark:text-blue-400" size={18} />
                                    </div>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                                        Creator
                                    </p>
                                </div>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-14">
                                    {details?.campaignOwner}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                                        <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400" size={18} />
                                    </div>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                                        Created On
                                    </p>
                                </div>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-14">
                                    {formatDate(details?.campaignCreatedTime)}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 transition-colors sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                                        <FaClock className="text-red-600 dark:text-red-400" size={18} />
                                    </div>
                                    <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                                        Last Date
                                    </p>
                                </div>
                                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-14">
                                    {formatDate(details?.lastDateofDonation)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-6 sm:mx-8 lg:mx-10"></div>

                    {/* Donation Section */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-3">
                            <FaDonate className="text-green-500" />
                            Make a Donation
                        </h3>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                            <Input 
                                size="lg" 
                                type="number" 
                                color="purple" 
                                label="Donation amount (in paisa)" 
                                required
                                className="text-lg dark:text-white"
                                onChange={(e) => setDonateBalance((e.target.value) * 100)} 
                            />
                            
                            {(maxDonationAmount === totalDonation || baseError) && (
                                <p className="text-red-600 dark:text-red-400 mt-3 ml-1 text-sm font-medium">
                                    {maxDonationAmount === totalDonation ? 'Donation completed...' : baseError}
                                </p>
                            )}

                            <Button 
                                fullWidth 
                                color="blue" 
                                ripple={true} 
                                className="py-4 rounded-xl font-semibold text-base mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300" 
                                onClick={() => setModalIsOpen(true)}
                                disabled={baseError ? true : false || maxDonationAmount === totalDonation || donateBalance === undefined}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <FaHeart size={18} />
                                    Donate Now
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                        Every Contribution Makes a Difference
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 opacity-90">
                        Join us in making a positive impact on the lives of animals in need. Your support matters!
                    </p>
                    <button
                        onClick={() => {
                            const donationInput = document.querySelector('input[type="number"]');
                            if (donationInput) {
                                donationInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                setTimeout(() => donationInput.focus(), 500);
                            }
                        }}
                        disabled={maxDonationAmount === totalDonation || pauseDonation}
                        className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        Support This Campaign
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal 
                isOpen={modalIsOpen} 
                ariaHideApp={false} 
                contentLabel="Donation Modal" 
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
                className="bg-white dark:bg-gray-800 p-6 w-full max-w-md rounded-3xl shadow-2xl mx-auto"
            >
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm 
                            donateBalance={donateBalance} 
                            id={id} 
                            setModalIsOpen={setModalIsOpen} 
                            refetch={refetch} 
                            details={details}
                        />
                    </Elements>
                </div>

                <button 
                    className="mt-4 w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-colors" 
                    onClick={() => setModalIsOpen(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default CampaignDetails;