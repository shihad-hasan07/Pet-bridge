import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
    return (
        <div className='text-center mt-80 '>
            <p className='text-7xl text-red-400'>404</p>
            <p className='text-4xl mb-2'>error</p>
            <p>Retun to <Link className='text-blue-800 text-xl underline' to='/'>Home</Link> </p>
        </div>
    );
};

export default Errorpage;