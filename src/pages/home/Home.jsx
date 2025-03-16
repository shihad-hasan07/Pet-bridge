import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import AboutUs from './AboutUs';
import { FaPaw, FaHandHoldingHeart, FaDonate, FaHandsHelping, FaHome, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const petCategories = [
    { name: "Cat", image: "home-category-logo/cat.png" },
    { name: "Dog", image: "home-category-logo/dog.png" },
    { name: "Rabbit", image: "home-category-logo/rabbit.png" },
    { name: "Horse", image: "home-category-logo/horse.png" },
    { name: "Fish", image: "home-category-logo/fish.png" },
];

const sponsors = [
    { name: "PawCare", logo: "/sponsor/pawcare.jpg" },
    { name: "PetLovers", logo: "/sponsor/petlovers.jpg" },
    { name: "Happy Tails", logo: "/sponsor/happytails.jpg" },
    { name: "Furry Friends", logo: "/sponsor/furyfriends.png" },
    { name: "Guardian Paws", logo: "/sponsor/guardianpaws.png" },
];
const Home = () => {
    const navigate = useNavigate()

    const handleCategoryClick = (category) => {
        console.log(category);
        navigate(`/pet-listing?category=${category}`);
    };

    return (
        <div>
            {/* slider/banner */}
            <div className='w-full'>
                <Swiper spaceBetween={30} effect={'fade'} navigation={true}
                    loop={true}

                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    className="mySwiper h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]"
                >
                    <SwiperSlide>
                        <img className='object-cover w-full h-full' src="/horse.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='object-cover w-full h-full' src="/cat.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='object-cover w-full h-full' src="/fish.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='object-cover h-full w-full' src="/rabbit.jpg" />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* pets category section */}
            <section className='bg-gray-100 px-6 dark:bg-[#212121] dark:text-white pb-12'>
                <div className="">
                    <h2 className=" text-center pt-10 text-4xl font-bold text-gray-800 dark:text-white mb-12">Pet Categories</h2>
                    <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                        {petCategories.map((category) => (
                            <div key={category.name}
                                className="cursor-pointer p-4 border  rounded-lg shadow-md hover:shadow-lg transition"
                                onClick={() => handleCategoryClick(category.name)}>

                                <img src={category.image} alt={category.name}
                                    className="w-full h-28 object-contain rounded-md" />
                                <p className="text-center font-semibold mt-2 text-xl">{category.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* pet care section */}
            <section className="py-12 bg-gray-100 dark:bg-[#181818]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">Pet Care Tips & Adoption Guides</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Pet Care Tips */}
                        <div className="bg-white dark:bg-[#212121] p-8 rounded-lg shadow-lg hover:scale-[101%] transform transition-all">
                            <div className="mb-6">
                                <img
                                    src="care/cat.jpg"
                                    alt="Pet Care"
                                    className="rounded-lg w-full h-48 object-cover mb-4"
                                />
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Pet Care Tips</h3>
                            </div>
                            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-3">
                                <li><strong>Nutrition:</strong> A balanced diet is key for health.</li>
                                <li><strong>Grooming:</strong> Regular brushing and care for a shiny coat.</li>
                                <li><strong>Exercise:</strong> Keep your pet active for a happy life.</li>
                                <li><strong>Health Check-ups:</strong> Stay ahead with regular vet visits.</li>
                            </ul>
                        </div>

                        {/* Adoption Guides */}
                        <div className="bg-white dark:bg-[#212121] p-8 rounded-lg shadow-lg hover:scale-[101%] transform transition-all">
                            <div className="mb-6">
                                <img
                                    src="/care/adopt.jpg"
                                    alt="Adopt a Pet"
                                    className="rounded-lg w-full h-48 object-cover mb-4"
                                />
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Adoption Guides</h3>
                            </div>
                            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-3">
                                <li><strong>Choose Wisely:</strong> Pick the right pet based on your lifestyle.</li>
                                <li><strong>Adopt, Don't Shop:</strong> Support shelters and give pets a second chance.</li>
                                <li><strong>Prepare Your Home:</strong> Create a safe, welcoming environment.</li>
                                <li><strong>First Day Tips:</strong> Patience and love go a long way in the beginning.</li>
                            </ul>
                        </div>

                        {/* Pet Care Resources */}
                        <div className="bg-white dark:bg-[#212121] p-8 rounded-lg shadow-lg hover:scale-[101%] transform transition-all">
                            <div className="mb-6">
                                <img
                                    src="care/resource.jpg"
                                    alt="Pet Resources"
                                    className="rounded-lg w-full h-48 object-cover mb-4"
                                />
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Pet Care Resources</h3>
                            </div>
                            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-3">
                                <li><strong>Pet Insurance:</strong> Protect your pet's health with the right plan.</li>
                                <li><strong>Training:</strong> Tips for positive reinforcement training.</li>
                                <li><strong>Products:</strong> Discover essential pet care products.</li>
                                <li><strong>Pet-Friendly Travel:</strong> Advice for taking your pet on the go.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* volunteer */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
                        Be a Hero for Homeless Pets 🐶🐱
                    </h2>

                    {/* Timeline Container */}
                    <div className="relative border-l-4 border-blue-500 dark:border-blue-400 mx-auto w-10/12 md:w-8/12">

                        {/* Step 1 - Find a Shelter */}
                        <div className="mb-10 ml-6">
                            <div className="absolute -left-6 bg-blue-500 dark:bg-blue-400 text-white p-3 rounded-full">
                                <FaPaw size={24} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Find a Local Shelter</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Research nearby shelters and see where help is needed the most.
                            </p>
                            <button className="mt-4 px-5 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
                                Locate Shelters
                            </button>
                        </div>

                        {/* Step 2 - Help with Activities */}
                        <div className="mb-10 ml-6">
                            <div className="absolute -left-6 bg-green-500 dark:bg-green-400 text-white p-3 rounded-full">
                                <FaHandsHelping size={24} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Join a Volunteering Event</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Help in feeding, cleaning, and caring for rescued animals.
                            </p>
                            <button className="mt-4 px-5 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                                Sign Up
                            </button>
                        </div>

                        {/* Step 3 - Foster or Adopt */}
                        <div className="ml-6">
                            <div className="absolute -left-6 bg-orange-500 dark:bg-orange-400 text-white p-3 rounded-full">
                                <FaHome size={24} />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Foster or Adopt a Pet</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                                Give a homeless pet a temporary or forever home.
                            </p>
                            <button className="mt-4 px-5 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition">
                                Learn More
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* encourage peoople */}
            <section
                className="relative bg-cover bg-center py-20 px-5 text-white"
                style={{ backgroundImage: "url('/cat.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative max-w-5xl mx-auto text-center space-y-6">
                    <h2 className="text-4xl font-bold">Make a Difference in a Pet's Life</h2>
                    <p className="text-lg max-w-3xl mx-auto">
                        Every pet deserves a loving home. Whether you choose to adopt, foster, or donate, you can change their world.
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                        {/* Adopt */}
                        <div
                            className="bg-white/20 dark:bg-gray-800 p-6 rounded-xl text-center transition hover:bg-white/30 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => navigate("/pet-listing")}
                        >
                            <FaPaw className="text-4xl mx-auto mb-3 text-yellow-300" />
                            <h3 className="text-xl font-semibold">Adopt a Pet</h3>
                            <p className="text-sm mt-2 text-gray-100 dark:text-gray-300">Find your perfect companion and give them a forever home.</p>
                        </div>

                        {/* Foster */}
                        <div
                            className="bg-white/20 dark:bg-gray-800 p-6 rounded-xl text-center transition hover:bg-white/30 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => navigate("/pet-listing")}
                        >
                            <FaHandHoldingHeart className="text-4xl mx-auto mb-3 text-pink-400" />
                            <h3 className="text-xl font-semibold">Foster a Pet</h3>
                            <p className="text-sm mt-2 text-gray-100 dark:text-gray-300">Provide temporary care for pets in need while they await adoption.</p>
                        </div>

                        {/* Donate */}
                        <div
                            className="bg-white/20 dark:bg-gray-800 p-6 rounded-xl text-center transition hover:bg-white/30 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => navigate("/donation-campaigns")}
                        >
                            <FaDonate className="text-4xl mx-auto mb-3 text-blue-400" />
                            <h3 className="text-xl font-semibold">Make a Donation</h3>
                            <p className="text-sm mt-2 text-gray-100 dark:text-gray-300">Support rescue efforts by contributing to food, shelter, and medical care.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* sponsor and partner */}
            <section className="py-16 px-6 bg-gray-100 dark:bg-[#181818]">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Section Title */}
                    <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                        Our Partners & Sponsors
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
                        We are proud to collaborate with amazing organizations that support pet welfare.
                    </p>

                    {/* Sponsors Grid */}
                    <div className="grid grid-cols-2 mx-auto px-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {sponsors.map((sponsor) => (
                            <div
                                key={sponsor.name}
                                className="w-28 h-28 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative group"
                            >
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="rounded-3xl object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                    <span className="text-sm">{sponsor.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AboutUs></AboutUs>

            <section className="py-16 bg-gray-100 dark:bg-[#181818]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
                        Get in Touch 📩
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left Side - Enhanced Contact Info */}
                        <div>
                            {/* Contact Cards */}
                            <div className="grid gap-6">
                                {/* Phone */}
                                <div className="flex items-center bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                                    <FaPhoneAlt className="text-blue-500 dark:text-blue-400 text-3xl mr-4" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Call Us</h4>
                                        <p className="text-gray-600 dark:text-gray-300">+1 234 567 890</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                                    <FaEnvelope className="text-red-500 dark:text-red-400 text-3xl mr-4" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Email Us</h4>
                                        <p className="text-gray-600 dark:text-gray-300">support@petcare.com</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                                    <FaMapMarkerAlt className="text-green-500 dark:text-green-400 text-3xl mr-4" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Visit Us</h4>
                                        <p className="text-gray-600 dark:text-gray-300">123 Pet Street, Animal City</p>
                                    </div>
                                </div>

                                {/* Support Hours */}
                                <div className="flex items-center bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition">
                                    <FaClock className="text-yellow-500 dark:text-yellow-400 text-3xl mr-4" />
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Support Hours</h4>
                                        <p className="text-gray-600 dark:text-gray-300">Mon - Fri: 9 AM - 6 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
                            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Send a Message</h3>

                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-600 dark:text-gray-300">Your Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-600 dark:text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        className="w-full px-4 py-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-600 dark:text-gray-300">Your Message</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Write your message here..."
                                        className="w-full px-4 py-2 mt-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                                    ></textarea>
                                </div>

                                <button className="w-full px-5 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
export default Home