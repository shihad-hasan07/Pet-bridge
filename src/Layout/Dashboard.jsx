import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { allContext } from '../authprovider/Authprovider';
import { IoIosArrowDown, IoMdAddCircleOutline, IoMdLogOut } from 'react-icons/io';
import asideBg from '../assets/bg1.jpeg'
import { IoLogOutOutline } from 'react-icons/io5';
import logo from '../assets/logo.png'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import UserAside from '../components/Dash_Components/UserAside';

const Dashboard = () => {
    const { user,logOut } = useContext(allContext)

    return (
        <div className='flex items-stretch'>
            <div className='min-h-screen' style={{ backgroundImage: `url(${asideBg})` }}>
                <UserAside user={user}></UserAside>
            </div>

            <div className='flex-grow '>
                <header className='h-[60px] flex justify-between' style={{ backgroundImage: `url(${asideBg})` }}>
                    <div className='w-20 ml-8 h-full flex  items-center justify-center'>
                        <img src={logo} className="invert w-full h- object-cover" alt="Logo" />
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton as='div'>
                                <div className='bg-[#ff5722] h-[60px] flex items-center gap-2 px-4 text-white'>
                                    <button className='flex items-center gap-2'>
                                        <img src={user?.photoURL} className='w-9 h-9 shadow-xl rounded-full' alt="" />
                                        <p>{user?.displayName}</p>
                                        <IoIosArrowDown />
                                    </button>
                                </div>
                            </MenuButton>
                        </div>
                        <MenuItems transition
                            className="absolute  right-0 z-50 w-[179px] origin-top-right rounded-sm bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                            <div className="py-1">
                                <MenuItem>
                                    <button className="w-full text-left block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My profile</button>
                                </MenuItem>
                                <MenuItem>
                                    <button className="w-full text-left block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Setting</button>
                                </MenuItem>
                                <MenuItem>
                                    <button onClick={()=>logOut()} className="w-full text-left  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex  gap-1">Log Out <IoLogOutOutline size={17} /></button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </header>

                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;