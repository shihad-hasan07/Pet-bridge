import React from 'react';
import Lottie from 'lottie-react';
import loadingLottie from '../assets/lottie/loading.json'

const Loading = () => {

    return (
        <div className="absolute inset-0">
            <Lottie animationData={loadingLottie} className="overflow-hidden -z-20 w-full h-full" />
        </div>
    );
};

export default Loading;