import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import formatDate from "./formatDate/formatDate";
import Loading from "../shared/Loading";
import Modal from 'react-modal';
import { useState } from "react";
import AdoptionRequest from "../pages/pet-listing/AdoptionRequest";
import { FaMapMarkerAlt, FaClock, FaUser, FaPaw, FaHeart, FaCalendarAlt } from 'react-icons/fa';

const PetDetails = () => {
    const param = useParams();
    const axiosSecure = useAxiosSecure();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { data: details = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: [`pet-details`, param],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet-details/${param.id}`);
            return res.data;
        }
    });

    if (isLoading) return <p className="min-h-[calc(100vh-393px)]"><Loading /></p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    const { adopted, age, category, fullDesciption, image, location, name, petAddTime, petOwner, sortDescription, _id } = details;
    console.log(adopted);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Hero Image Section */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6 sm:mb-8 group">
                    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
                        <img
                            src={image}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={name}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        {/* Status Badge */}
                        {adopted && (
                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                                ✓ Adopted
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
                            <FaPaw className="text-blue-500" />
                            <span className="text-gray-800 dark:text-white">{category}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                            <div className="flex-1">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                                    {name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 sm:px-4 py-2 rounded-full">
                                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" size={16} />
                                        <span className="text-sm sm:text-base font-medium">{location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 sm:px-4 py-2 rounded-full">
                                        <FaClock className="text-blue-500 flex-shrink-0" size={16} />
                                        <span className="text-sm sm:text-base font-medium">{age} days old</span>
                                    </div>
                                </div>
                            </div>

                            {/* Adopt Button */}
                            <button
                                onClick={() => setModalIsOpen(true)}
                                className="w-full lg:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-base sm:text-lg"
                            >
                                <FaHeart size={18} />
                                Adopt {name}
                            </button>
                        </div>

                        {/* Short Description */}
                        <p className="mt-6 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {sortDescription}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-6 sm:mx-8 lg:mx-10"></div>

                    {/* About Section */}
                    <div className="p-6 sm:p-8 lg:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-3">
                            <FaPaw className="text-blue-500" />
                            About {name}
                        </h2>

                        {/* Age Info */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-blue-100 dark:border-blue-800">
                            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Age: <span className="text-blue-600 dark:text-blue-400">{age} days</span>
                            </p>
                        </div>

                        {/* Full Description */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                Description
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                {fullDesciption}
                            </p>
                        </div>

                        {/* Owner and Date Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                        <FaUser className="text-blue-600 dark:text-blue-400" size={20} />
                                    </div>
                                    <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Owner
                                    </p>
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 ml-14">
                                    {petOwner}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                                        <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400" size={20} />
                                    </div>
                                    <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Listed On
                                    </p>
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 ml-14">
                                    {formatDate(petAddTime)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                        Ready to Give {name} a Forever Home?
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 opacity-90">
                        Click the adopt button and fill out the adoption form to get started!
                    </p>
                    <button
                        onClick={() => setModalIsOpen(true)}
                        className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg"
                    >
                        Start Adoption Process
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={true}
                contentLabel="Adoption Modal"
                overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4"
                className="bg-white dark:bg-gray-800 p-6 w-full max-w-md rounded-3xl shadow-2xl mx-auto text-gray-900 dark:text-gray-100"
            >
                <AdoptionRequest details={details} setModalIsOpen={setModalIsOpen} />
            </Modal>
        </div>
    );
};

export default PetDetails;