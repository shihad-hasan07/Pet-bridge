import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import PetCategory from '../../components/HomeComponents/PetCategory';
import axios from 'axios';

const Home = () => {

    const hi = () => {

        const man = {
            "_id": 4,
            "category": 'Cat',
            "image": "/rabbit.jpg",
            "name": 'd o g saheb',
            "age": 2,
            "location": "kuttapara"
        }
        axios.post('http://localhost:5000/add-pet', man)
            .then(res => console.log('response', res.data))
            .catch(err => console.log(err))
    }
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
                <div className=''>
                    <PetCategory></PetCategory>
                </div>
            </section>

            {/* <------------------------call to action section-----------------> */}
            <div>
                <button onClick={hi} className='text-7xl'>Post</button>
            </div>

        </div>
    );
}
export default Home