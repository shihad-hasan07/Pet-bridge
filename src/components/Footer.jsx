import React from 'react';
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div>

            <footer className="bg-gray-900 text-white pt-10 pb-3 px-6">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

                    {/* Left Side - Logo & Description */}
                    <div className="md:w-1/4 ">
                        <Link to='/'> <img src={logo} alt="Logo" className="h-12 mb-3 invert" /></Link>
                        <p className="text-gray-400 text-sm">
                            Let's make world beatiful
                        </p>
                    </div>

                    {/* Center - Useful Links */}
                    <div className="md:w-1/2 grid grid-cols-3 gap-6">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
                            <ul className="space-y-1 text-gray-400">
                                <li><Link className="hover:text-blue-400">Content</Link></li>
                                <li><Link className="hover:text-blue-400">How it Works</Link></li>
                                <li><Link className="hover:text-blue-400">Create</Link></li>
                                <li><Link className="hover:text-blue-400">Explore</Link></li>
                                <li><Link className="hover:text-blue-400">Terms & Services</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Community</h4>
                            <ul className="space-y-1 text-gray-400">
                                <li><Link className="hover:text-blue-400">Help Center</Link></li>
                                <li><Link className="hover:text-blue-400">Partners</Link></li>
                                <li><Link className="hover:text-blue-400">Suggestions</Link></li>
                                <li><Link className="hover:text-blue-400">Blog</Link></li>
                                <li><Link className="hover:text-blue-400">Newsletters</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-2">Partner</h4>
                            <ul className="space-y-1 text-gray-400">
                                <li><Link className="hover:text-blue-400">Our Partner</Link></li>
                                <li><Link className="hover:text-blue-400">Become a Partner</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="md:w-1/4 space-y-2">
                        <h4 className="text-lg font-semibold mb-2">Contact</h4>
                        <p className="flex items-center text-gray-400">
                            <MdEmail className="mr-2 text-xl" /> example@email.com
                        </p>
                        <p className="flex items-center text-gray-400">
                            <MdPhone className="mr-2 text-xl" /> +123 456 7890
                        </p>
                        <p className="flex items-center text-gray-400">
                            <MdPhone className="mr-2 text-xl" /> +987 654 3210
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-4">
                            <a href="https://instagram.com" className="text-gray-400 hover:text-blue-400">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://facebook.com" className="text-gray-400 hover:text-blue-400">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-400">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
                    Copyright © 2025 PetBridge All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;