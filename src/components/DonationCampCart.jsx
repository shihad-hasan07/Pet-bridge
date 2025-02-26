import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const DonationCampCart = ({ data }) => {
    return (
        <div className=' mb-10 mr-5 shadow-lg rounded-b-3xl '>
            <div className='bg-black rounded-t-3xl'>
                <img src={data?.image} className='w-full rounded-t-2xl h-72 object-cover ' alt="" />
            </div>
            <div className='bg-green-100 relative -mt-7 p-6' style={{ borderRadius: "70% 70% 5% 5% / 18% 18% 10% 10%" }}>
                <p className='text-blue-900  font-semibold text-xl first-letter:uppercase text-center'>{data?.name}</p>
                <div className='my-2 text-center'>
                    <p>Max Donation : {data?.maxDonationAmount} tk</p>
                    <p className='py-1'>Total Donation : {data?.totalDonation} tk</p>
                </div>
                <Link to={`/donation-campaign-details/${data._id}`}>
                    <Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                        View details </Button>
                </Link>
            </div>

        </div>
    );
};

export default DonationCampCart;