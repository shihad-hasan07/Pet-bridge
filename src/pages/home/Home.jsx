import React, { useRef, useState } from 'react';
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
            <div className=''>
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
            <div>

            </div>
            
        </div>
    );
}
export default Home