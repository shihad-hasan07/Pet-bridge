import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const Home = () => {


    return (
        <div>

            {/* <--------slider/banner---------> */}
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

            {/* <----------------pets category section------------> */}
            <section className='bg-gray-100'>

            </section>

            {/* about us section */}
            <section className="bg-gray-100 py-12 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
                    <p className="text-gray-600 text-lg">
                        Welcome to <span className="font-semibold">[Your Website Name]</span>, a platform
                        dedicated to connecting loving homes with pets in need. Our goal is to
                        simplify the adoption process by providing an easy-to-use interface
                        where you can browse available pets, learn about their stories, and
                        start the adoption journey with just a few clicks.
                    </p>
                    <p className="text-gray-600 text-lg mt-4">
                        We created this platform to support shelters and rescue
                        organizations, making pet adoption accessible and transparent. Join us
                        in giving every pet a chance for a happier, healthier life!
                    </p>
                </div>
            </section>


            {/* <------------------------call to action section-----------------> */}
            <section>
                <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-4">
                    <img
                        src={""}
                        alt={""}
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Shihad hasan</h2>
                        <p className="text-sm text-gray-500">Category:</p>
                        <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur.</p>
                        <div className="flex items-center mt-2">

                            <span className="ml-2 text-gray-600">rating/ 5</span>
                        </div>
                        <div className="mt-3">
                            <p className="text-sm text-gray-600">
                                Customization
                            </p>
                            <p className="text-sm text-gray-600">Processing Time:10pm</p>
                            <p className="text-sm text-gray-600">Stock:</p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-lg font-bold">500$</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
export default Home