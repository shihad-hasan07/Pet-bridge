import React, { useContext } from 'react';
import { MdEmail, MdPhone, MdLocationOn, MdCalendarToday,MdEdit, MdCameraAlt, MdAccessTime, MdAdd, MdSettings, MdPets} from 'react-icons/md';
import { FaAward,  FaCheckCircle, FaTasks, FaCalendarAlt, FaPaw, FaDonate} from 'react-icons/fa';
import { FaCodePullRequest } from "react-icons/fa6";
import { BiTask } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { allContext } from '../../authprovider/Authprovider';

const Dash_User = () => {
    const { user } = useContext(allContext);
    console.log(user);

    // Format dates from Firebase metadata
    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(parseInt(timestamp));
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const formatLastLogin = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Real user data from Firebase
    const userDetails = {
        email: user?.email || 'user@example.com',
        displayName: user?.displayName || 'User Name',
        photoURL: user?.photoURL || 'https://via.placeholder.com/150',
        emailVerified: user?.emailVerified || false,
        phoneNumber: user?.phoneNumber || '+880 1234-567890',
        joinDate: formatDate(user?.metadata?.createdAt) || 'January 2024',
        location: 'Dhaka, Bangladesh',
        role: user?.emailVerified ? 'Verified Member' : 'New Member',
        petAdded: 5,
        petRequest: 2,
        donationCampaign: 0
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    {/* Cover Image */}
                    <div className="h-32 md:h-48 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 relative">
                        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                            <MdCameraAlt className="w-5 h-5" />
                            <span className="hidden sm:inline">Change Cover</span>
                        </button>
                    </div>

                    {/* Profile Info Section */}
                    <div className="px-4 md:px-8 pb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 gap-4">
                            {/* Profile Picture */}
                            <div className="relative">
                                <img
                                    src={userDetails.photoURL}
                                    alt={userDetails.displayName}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white shadow-2xl object-cover"
                                />
                                <button className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-all">
                                    <MdCameraAlt className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Name and Role */}
                            <div className="flex-grow text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                        {userDetails.displayName}
                                    </h1>
                                    {userDetails.emailVerified && (
                                        <FaCheckCircle className="w-6 h-6 text-blue-500" title="Verified" />
                                    )}
                                </div>
                                <p className="text-lg text-gray-600 mt-1 flex items-center justify-center md:justify-start gap-2">
                                    <FaAward className="w-5 h-5 text-orange-500" />
                                    {userDetails.role}
                                </p>
                                <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                                    {userDetails.bio}
                                </p>
                            </div>

                            {/* Edit Button */}
                            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                                <MdEdit className="w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats & Quick Info */}
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Statistics</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <FaPaw className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Pet Added</p>
                                            <p className="text-2xl font-bold text-gray-800">{userDetails.petAdded}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                            <MdPets className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Pet Request</p>
                                            <p className="text-2xl font-bold text-gray-800">{userDetails.petRequest}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                            <FaDonate className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Donation Campaign</p>
                                            <p className="text-2xl font-bold text-gray-800">{userDetails.donationCampaign}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Recent Activity</h2>
                            <div className="space-y-4">
                                <div className="pt-4">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Timeline</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 pl-2 border-l-2 border-orange-300 pb-3">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 -ml-[5px]"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Added new pet</p>
                                                <p className="text-xs text-gray-500">2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 pl-2 border-l-2 border-blue-300 pb-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 -ml-[5px]"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Requested pet adoption</p>
                                                <p className="text-xs text-gray-500">5 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 pl-2 border-l-2 border-green-300">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 -ml-[5px]"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">Updated profile</p>
                                                <p className="text-xs text-gray-500">1 day ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Firebase Info Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Account Info</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Email Status:</span>
                                    <div className="flex items-center gap-1">
                                        {userDetails.emailVerified ? (
                                            <>
                                                <FaCheckCircle className="text-green-600 w-4 h-4" />
                                                <span className="font-semibold text-green-600">Verified</span>
                                            </>
                                        ) : (
                                            <span className="font-semibold text-red-600">Not Verified</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Member Since:</span>
                                    <span className="font-semibold text-gray-800">{userDetails.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & About */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MdEmail className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Email Address</p>
                                        <p className="text-gray-800 font-semibold truncate">{userDetails.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MdPhone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Phone Number</p>
                                        <p className="text-gray-800 font-semibold">{userDetails.phoneNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MdLocationOn className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Location</p>
                                        <p className="text-gray-800 font-semibold">{userDetails.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MdCalendarToday className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Member Since</p>
                                        <p className="text-gray-800 font-semibold">{userDetails.joinDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <div className="flex items-center justify-between mb-6 border-b pb-3">
                                <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
                                <button className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1">
                                    <MdEdit className="w-4 h-4" />
                                    Edit
                                </button>
                            </div>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Pet lover and animal welfare advocate. Passionate about finding loving homes for pets in need.
                                </p>
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Interests</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Pet Care</span>
                                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">Animal Welfare</span>
                                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Pet Adoption</span>
                                        <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Pet Training</span>
                                        <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Volunteering</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center">
                                    <Link to='/dashboard/addPet'>
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <FaPaw className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">Add Pet</p>
                                    </Link>
                                </button>
                                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center">
                                    <Link to='/dashboard/my-added-pets'>
                                        <div className="w-10 h-10 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <MdPets className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">My Pets</p>
                                    </Link>
                                </button>
                                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center">
                                    <Link to='/dashboard/my-donation'>
                                        <div className="w-10 h-10 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <FaDonate className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">My Donation</p>
                                    </Link>
                                </button>
                                <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center">
                                    <Link to='/dashboard/adoption-request'>
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                            <FaCodePullRequest className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-700">Adoption Request</p>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dash_User;