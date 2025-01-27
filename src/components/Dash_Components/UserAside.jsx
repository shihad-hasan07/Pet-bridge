import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineBookmarkAdded, MdOutlineCampaign } from 'react-icons/md';
import { LuGitPullRequest } from 'react-icons/lu';
import { TbBrandCampaignmonitor } from 'react-icons/tb';
import { LiaDonateSolid } from 'react-icons/lia'
import { IoHomeOutline } from 'react-icons/io5';
import asideBg from '../../assets/bg1.jpeg'
import { allContext } from '../../authprovider/Authprovider';
import { IoMdAddCircleOutline } from 'react-icons/io';

const UserAside = () => {
    const { user } = useContext(allContext)

    return (
        <aside style={{ backgroundImage: `url(${asideBg})` }} className='w-72 '>

            {/* <----------------user name and image-----------------> */}

            <div className='bg-[#214162] flex items-center gap-4 justify-center p-4'>
                <img src={user?.photoURL} className='w-16 h-16 rounded-full' alt="not found" />
                <div className=''>
                    <p className='overflow-hidden text-lg font-sans text-white font-semibold '>{user?.displayName}</p>
                    <p className='text-[#1dca83] pl-5'>Online</p>
                </div>
            </div>
            <p className=' p-5  text-white text-xl'>General</p>
            <hr />
            <div className='p-1 text-white'>

                {/* <-----------Go home page----------> */}
                <NavLink to='/' className={({ isActive }) => isActive ? 'transition-all duration-300 flex items-center bg-blue-900 text-white py-3 rounded-md pl-7 gap-3 w-full text-left mt-2'
                    : 'flex bg-none text-gray-300 gap-3 w-full pl-4 text-left mt-2 hover:bg-[#1a245f] py-3 rounded-md'}>
                    <IoHomeOutline size={18} />
                    <button>Home</button>
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