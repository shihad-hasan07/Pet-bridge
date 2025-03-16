import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 dark:bg-[#212121]  py-16 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                {/* Image Section */}
                <div className="w-full grid grid-cols-2 md:w-1/2 gap-1  bg-blue-700 rounded-2xl">
                    <img src='aboutus/fish.jpg' className='w-full h-full rounded-tl-xl' alt="" />
                    <img src='aboutus/cat2.jpg' className='w-full h-full rounded-tr-xl' alt="" />
                    <img src='aboutus/horse.jpeg' className='w-full h-full rounded-bl-xl' alt="" />
                    <img src='aboutus/cat.jpg' className='w-full h-full rounded-br-xl' alt="" />
                </div>

                {/* Text Content Section */}
                <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left mt-6 md:mt-0">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">About Us</h2>
                    <p className="text-lg text-gray-700 mb-4 dark:text-[#e2dddd]">
                        Welcome to our pet adoption platform, where we connect loving families
                        with pets in need of a forever home. Our mission is to ensure every
                        pet finds a safe and caring environment.
                    </p>
                    <p className="text-lg text-gray-700 mb-4  dark:text-[#e2dddd]">
                        Our platform allows users to browse available pets, learn about their
                        history, and complete the adoption process seamlessly. Whether you're
                        looking for a playful kitten, a loyal dog, or a quiet companion, we are
                        here to guide you in finding your perfect pet.
                    </p>
                    <p className="text-lg text-gray-700 mb-6  dark:text-[#e2dddd]">
                        Join us in making a difference—one adoption at a time!
                    </p>
                    <a
                        href="/pet-listing"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition"
                    >
                        View Pets for Adoption
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;