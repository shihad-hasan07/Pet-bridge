import { FaSun, FaMoon } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { allContext } from '../authprovider/Authprovider';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IoMenuSharp } from 'react-icons/io5';

const Header = () => {
    const { user,logOut } = useContext(allContext)

    const [isDarkMode, setIsDarkMode] = useState(true);
    const handleThemeToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    // user logout 
    const logout=()=>{
        logOut()
    }

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">

                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/'>
                        <div className='w-32'>
                            <img src={logo} className="w-full object-cover object-center dark:invert" alt="Logo" />
                        </div>
                    </Link>

                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

                        <div className='flex items-center'>
                            {/* <-----------  theme Toogle  ---------> */}
                            <button type="button" onClick={handleThemeToggle} className=' dark:text-white mr-5 text-3xl' >{isDarkMode ? <FaSun></FaSun> : <FaMoon></FaMoon>}</button>

                            {/* <-------------user or signin login-----------> */}
                            {
                                user
                                    ? <>
                                        <Menu as="div" className="relative  inline-block text-left">
                                            <div>
                                                <MenuButton >
                                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                                        <img className="w-10 h-10 rounded-full" src="../../public/vite.svg" alt="user photo" />
                                                    </button>
                                                </MenuButton>
                                            </div>

                                            <MenuItems transition
                                                className="absolute  right-0 z-10 mt-1 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                                                <div className="py-1">
                                                    <div className="px-4 py-3">
                                                        <span className="block text-sm text-gray-900 dark:text-white">User Name</span>
                                                    </div>
                                                    <hr />
                                                    <MenuItem>
                                                        <Link to='/dashboard'><button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</button></Link>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button onClick={logout}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</button>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>

                                    </>
                                    : <>
                                        <Link to='/login'>
                                            <Button variant='text' className="border-2 text-sm px-7 py-3 border-blue-300 mx-3" color='blue'>
                                                login{" "}
                                            </Button>
                                        </Link>
                                        <Button color="blue" className='px-7 py-3 border-2 border-[#3f83f8] text-sm flex items-center' >
                                            sign up{" "}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                                className="h-5 w-5 dark:text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Button>
                                    </>
                            }
                        </div>

                        {/* <----------menu icon show only small device------------> */}
                        <Menu as="div" className="relative md:hidden inline-block text-left ml-56">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                                    <IoMenuSharp />
                                </MenuButton>
                            </div>

                            <MenuItems transition
                                className="absolute  right-0 z-10 mt-1 w-52 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                                <div className="py-1">
                                    <MenuItem>
                                        <NavLink to='/' className={({ isActive }) => isActive ? "block px-4 py-2 text-sm bg-blue-700 text-white"
                                            : "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        }>Home</NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink to='/pet-listing' className={({ isActive }) => isActive ? "block px-4 py-2 text-sm bg-blue-700 text-white"
                                            : "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        }>Pet Listings</NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink to='/donation-campaigns' className={({ isActive }) => isActive ? "block px-4 py-2 text-sm bg-blue-700 text-white"
                                            : "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        }>Donation Campaigns</NavLink>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                    {/* <-----------navlink show in large devices----------> */}
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to='/' className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/pet-listing' className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }>Pet Listing</NavLink>
                            </li>
                            <li>
                                <NavLink to='/donation-campaigns' className={({ isActive }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                }>Donation</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


        </div>
    );
};

export default Header;