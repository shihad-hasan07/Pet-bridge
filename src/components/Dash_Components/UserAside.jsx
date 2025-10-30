import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineBookmarkAdded, MdOutlineCampaign, MdOutlinePets } from 'react-icons/md';
import { LuGitPullRequest } from 'react-icons/lu';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { LiaDonateSolid } from 'react-icons/lia'
import { IoHomeOutline } from 'react-icons/io5';
import asideBg from '../../assets/bg1.jpeg'
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaDonate, FaUsers } from 'react-icons/fa';
import useCheckAdmin from '../../hooks/useCheckAdmin';

const UserAside = ({ user }) => {
    const { checkAdmin } = useCheckAdmin()

    return (
        <aside style={{ backgroundImage: `url(${asideBg})` }} className='w-20 md:w-72 transition-all duration-300'>

            {/* <----------------user name and image-----------------> */}
            <div>
                <Link to='/dashboard/user'>
                    <div className='bg-[#214162] flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center p-2 md:p-4'>
                        <img src={user?.photoURL} className='w-12 h-12 md:w-16 md:h-16 rounded-full' alt="not found" />
                        <div className='hidden md:block'>
                            <p className='overflow-hidden text-lg font-sans text-white font-semibold tracking-wide'>{user?.displayName}</p>
                            <p className='text-[#1dca83] pl-5'>Online</p>
                        </div>
                    </div>
                </Link>
            </div>
            
            <p className='pt-5 pl-2 md:pl-5 pb-2 text-white text-sm md:text-xl text-center md:text-left'>
                {checkAdmin === 'admin' ? 'Admin' : 'User'}
            </p>

            {
                checkAdmin === "admin"
                    ? <div className='p-1'>
                        <NavLink 
                            to='/dashboard/admin/all-users' 
                            className={({ isActive }) => isActive 
                                ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full'
                                : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 hover:bg-[#1a245f] py-3 rounded-md'
                            }
                            title="Users"
                        >
                            <FaUsers size={18} className='' />
                            <span className='hidden md:inline'>Users</span>
                        </NavLink>
                        
                        <NavLink 
                            to='/dashboard/admin/all-pets' 
                            className={({ isActive }) => isActive 
                                ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                                : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                            }
                            title="All Pets"
                        >
                            <MdOutlinePets size={20} />
                            <span className='hidden md:inline'>All pets</span>
                        </NavLink>
                        
                        <NavLink 
                            to='/dashboard/admin/all-donations' 
                            className={({ isActive }) => isActive 
                                ? 'transition-all duration-300 flex items-center justify-center md:justify-start mb-3 bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                                : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 mb-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                            }
                            title="All Donations"
                        >
                            <FaDonate size={18} />
                            <span className='hidden md:inline'>All Donations</span>
                        </NavLink>
                    </div>
                    : <></>
            }

            <hr />
            <div className='p-1 text-white'>

                {/* <-----------Go home page----------> */}
                <NavLink 
                    to='/' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="Go Home"
                >
                    <IoHomeOutline size={18} />
                    <span className='hidden md:inline'>Go Home</span>
                </NavLink>

                {/* <---------------- user dashboard --------------------> */}

                <NavLink 
                    to='/dashboard/addPet' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="Add a pet"
                >
                    <IoMdAddCircleOutline size={20} />
                    <span className='hidden md:inline'>Add a pet</span>
                </NavLink>

                <NavLink 
                    to='/dashboard/my-added-pets' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="My added pets"
                >
                    <MdOutlineBookmarkAdded size={20} />
                    <span className='hidden md:inline'>My added pets</span>
                </NavLink>

                <NavLink 
                    to='/dashboard/create-donation-campaign' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="Create Donation Campaign"
                >
                    <MdOutlineCampaign size={18} />
                    <span className='hidden md:inline'>Create Donation Campaign</span>
                </NavLink>

                <NavLink 
                    to='/dashboard/my-donation-campaign' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="My donation campaign"
                >
                    <TbBrandCampaignmonitor size={18} />
                    <span className='hidden md:inline'>My donation campaign</span>
                </NavLink>

                <NavLink 
                    to='/dashboard/my-donation' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="My donation"
                >
                    <LiaDonateSolid size={18} />
                    <span className='hidden md:inline'>My donation</span>
                </NavLink>

                <NavLink 
                    to='/dashboard/adoption-request' 
                    className={({ isActive }) => isActive 
                        ? 'transition-all duration-300 flex items-center justify-center md:justify-start bg-blue-900 text-white py-3 rounded-md md:pl-7 gap-2 md:gap-3 w-full mt-2'
                        : 'flex items-center justify-center md:justify-start bg-none text-gray-300 gap-2 md:gap-3 w-full md:pl-4 mt-2 hover:bg-[#1a245f] py-3 rounded-md'
                    }
                    title="Adoption Request"
                >
                    <LuGitPullRequest size={18} />
                    <span className='hidden md:inline'>Adoption Request</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default UserAside;