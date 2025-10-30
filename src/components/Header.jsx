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
    const { user, logOut } = useContext(allContext)

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const handleThemeToggle = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
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
    const logout = () => {
        logOut()
    }

    return (
        <div className="sticky top-0 z-50 shadow-lg">
            <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo Section */}
                        <Link to='/' className="flex-shrink-0 group">
                            <div className='w-32 sm:w-36 transition-transform duration-300 group-hover:scale-105'>
                                <img src={logo} className="w-full h-auto object-contain dark:invert drop-shadow-md" alt="Logo" />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                            <NavLink 
                                to='/' 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md transition-all duration-300"
                                        : "px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to='/pet-listing' 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md transition-all duration-300"
                                        : "px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                                }
                            >
                                Pet Listing
                            </NavLink>
                            <NavLink 
                                to='/donation-campaigns' 
                                className={({ isActive }) => 
                                    isActive 
                                        ? "px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md transition-all duration-300"
                                        : "px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                                }
                            >
                                Donation Campaigns
                            </NavLink>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            {/* Theme Toggle */}
                            <button 
                                type="button" 
                                onClick={handleThemeToggle} 
                                className='p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 shadow-sm'
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                            </button>

                            {/* User Section */}
                            {user ? (
                                <Menu as="div" className="relative">
                                    <MenuButton>
                                        <div className="flex items-center space-x-2 sm:space-x-3 p-1.5 pr-3 sm:pr-4 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer border border-blue-100 dark:border-gray-600">
                                            <img 
                                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" 
                                                src={user?.photoURL} 
                                                alt="user photo" 
                                            />
                                            <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300 hidden sm:block" />
                                        </div>
                                    </MenuButton>

                                    <MenuItems 
                                        transition
                                        className="absolute right-0 z-50 mt-3 w-56 origin-top-right rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-gray-700 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in overflow-hidden"
                                    >
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {user?.displayName}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">
                                                Account Settings
                                            </p>
                                        </div>
                                        <div className="py-2">
                                            <MenuItem>
                                                <Link to='/dashboard/user'>
                                                    <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                                        </svg>
                                                        <span>Dashboard</span>
                                                    </button>
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <button 
                                                    onClick={logout}
                                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center space-x-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Log Out</span>
                                                </button>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link to='/login' className="hidden sm:block">
                                        <Button 
                                            variant='outlined' 
                                            className="px-5 py-2.5 border-2 border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl font-semibold transition-all duration-300 hover:shadow-md text-sm"
                                            color='blue'
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to='/signup'>
                                        <Button 
                                            className='px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm'
                                            color="blue"
                                        >
                                            <span>Sign Up</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                            </svg>
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <Menu as="div" className="relative md:hidden">
                                <MenuButton className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm">
                                    <IoMenuSharp size={24} />
                                </MenuButton>

                                <MenuItems 
                                    transition
                                    className="absolute right-0 z-50 mt-3 w-56 origin-top-right rounded-2xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-gray-700 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in overflow-hidden"
                                >
                                    <div className="py-2">
                                        <MenuItem>
                                            <NavLink 
                                                to='/' 
                                                className={({ isActive }) => 
                                                    isActive 
                                                        ? "block px-4 py-3 text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                        : "block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                                }
                                            >
                                                Home
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <NavLink 
                                                to='/pet-listing' 
                                                className={({ isActive }) => 
                                                    isActive 
                                                        ? "block px-4 py-3 text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                        : "block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                                }
                                            >
                                                Pet Listings
                                            </NavLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <NavLink 
                                                to='/donation-campaigns' 
                                                className={({ isActive }) => 
                                                    isActive 
                                                        ? "block px-4 py-3 text-sm font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                                                        : "block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                                }
                                            >
                                                Donation Campaigns
                                            </NavLink>
                                        </MenuItem>
                                        {!user && (
                                            <>
                                                <div className="my-2 h-px bg-gray-200 dark:bg-gray-700"></div>
                                                <MenuItem>
                                                    <Link to='/login'>
                                                        <button className="w-full text-left px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                                            Login
                                                        </button>
                                                    </Link>
                                                </MenuItem>
                                            </>
                                        )}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;