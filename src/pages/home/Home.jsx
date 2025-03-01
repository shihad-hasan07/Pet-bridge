import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import AboutUs from './AboutUs';

const petCategories = [
    { name: "Cat", image: "../../../public/home-category-logo/cat.png" },
    { name: "Dog", image: "../../../public/home-category-logo/dog.png" },
    { name: "Rabbit", image: "../../../public/home-category-logo/rabbit.png" },
    { name: "Horse", image: "../../../public/home-category-logo/horse.png" },
    { name: "Fish", image: "../../../public/home-category-logo/fish.png" },
];
const Home = () => {
    const navigate = useNavigate()

    const handleCategoryClick = (category) => {
        console.log(category);
        navigate(`/pet-listing?category=${category}`);
    };

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


            {/* <-----------pets category section--------> */}
            <section className='bg-gray-100 dark:bg-[#212121] dark:text-white pb-12'>
                <div className="">
                    <h2 className="text-2xl text-center font-bold py-10">Pet Categories</h2>
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


            {/* <-------------call to action section-----------> */}
            <section>
            </section>


            {/*  <-----------about us section -----------> */}
            <section>
                <AboutUs></AboutUs>
            </section>


            {/* <-------extra section 1--------> */}
            <section>


            </section>
            {/* <-------extra section 2--------> */}
            <section>
            </section>
            
        </div>
    );
}
export default Home