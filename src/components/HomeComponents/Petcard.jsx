import React from 'react';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PetCard = ({ details }) => {
    const { _id, name, image, age, location } = details;

    return (
        <Card className="max-w-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow ">
            <div className="">
                <img src={image} alt={`${name} image`}
                    className="w-full h-60 object-cover rounded-t-2xl" />
            </div>

            <CardBody className="p-4 rounded-t-[30%]  -mt-8 z-20  bg-white dark:bg-[#212121]  border-t">
                <Typography variant="h5" color="blue-gray" className="mb-1 first-letter:uppercase dark:text-white font-bold text-center">
                    {name}
                </Typography>
                <Typography color="gray" className="text-sm text-center mb-2 dark:text-white">
                    {/* Puppy • Wirehaired Terrier */}
                    Age • {age} days
                </Typography>
                <div className="flex items-center justify-center text-gray-600 dark:text-white">
                    <FaMapMarkerAlt size={15} className="mr-1" />
                    <Typography color="gray" className="text-sm dark:text-white">
                        Location :
                        <span className='first-letter:uppercase dark:text-white'>{location}</span>
                    </Typography>
                </div>
            </CardBody>

            <CardFooter className="pt-0 dark:bg-[#212121] rounded-b-2xl">
                <Link to={`/pet/details/${_id}`}>
                    <Button fullWidth color="blue" ripple={true} className="py-2 rounded-lg font-medium">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default PetCard;