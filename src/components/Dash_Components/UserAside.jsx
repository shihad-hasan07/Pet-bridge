import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineBookmarkAdded, MdOutlineCampaign, MdOutlinePets } from 'react-icons/md';
import { LuGitPullRequest } from 'react-icons/lu';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { LiaDonateSolid } from 'react-icons/lia'
import { IoHomeOutline } from 'react-icons/io5';
import asideBg from '../../assets/bg1.jpeg'
import { allContext } from '../../authprovider/Authprovider';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { PiUsersThree } from 'react-icons/pi';
import { FaDonate, FaUsers } from 'react-icons/fa';

const UserAside = () => {
    const { user } = useContext(allContext)

    const role = "admin";

    return (
        <aside style={{ backgroundImage: `url(${asideBg})` }} className='w-72 '>

            {/* <----------------user name and image-----------------> */}

            <div className='bg-[#214162] flex items-center gap-4 justify-center p-4'>
                <img src={user?.photoURL} className='w-16 h-16 rounded-full' alt="not found" />
                <div className=''>
                    <p className='overflow-hidden text-lg font-sans text-white font-semibold tracking-wide'>{user?.displayName}</p>
                    <p className='text-[#1dca83] pl-5'>Online</p>
                </div>
            </div>
            <p className=' pt-5 pl-5 pb-2  text-white text-xl'>{role === 'admin' ? 'Admin' : 'General'}</p>

            {
                role === "admin"
                    ? <div className='p-1'>
                        <NavLink to='/dashboard/admin/all-users' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left'
                            : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left hover:bg-[#1a245f] py-3 rounded-md'}>
                            <FaUsers size={18} className='ml-[1px]' /><button>
                                Users</button>
                        </NavLink>
                        <NavLink to='/dashboard/admin/all-pets' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                            : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                            <MdOutlinePets size={20} /><button>
                                All pets</button>
                        </NavLink>
                        <NavLink to='/dashboard/admin/all-donations' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center mb-3 bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                            : 'flex bg-none text-gray-300 gap-4 mb-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                            <FaDonate size={18} /><button>
                                All Donations</button>
                        </NavLink>
                    </div>
                    : <></>
            }

            <hr />
            <div className='p-1 text-white'>

                {/* <-----------Go home page----------> */}
                <NavLink to='/' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <IoHomeOutline size={18} />
                    <button> Go Home</button>
                </NavLink>

                {/* <---------------- user dashboard --------------------> */}

                <NavLink to='/dashboard/addPet' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <IoMdAddCircleOutline size={20} /><button>
                        Add a pet</button>
                </NavLink>

                <NavLink to='/dashboard/my-added-pets' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <MdOutlineBookmarkAdded size={20} /><button>
                        My added pets</button>
                </NavLink>

                <NavLink to='/dashboard/adoption-request' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : ' flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <LuGitPullRequest /><button>
                        Adoption Request</button>
                </NavLink>

                <NavLink to='/dashboard/create-donation-campaign' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <MdOutlineCampaign /><button>
                        Create Donation Campaign</button>
                </NavLink>

                <NavLink to='/dashboard/my-donation-campaign' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <TbBrandCampaignmonitor /><button>
                        My donation campaign</button>
                </NavLink>

                <NavLink to='/dashboard/my-donation' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <LiaDonateSolid /><button>
                        My donation</button>
                </NavLink>
            </div>
        </aside >
    );
};

export default UserAside;