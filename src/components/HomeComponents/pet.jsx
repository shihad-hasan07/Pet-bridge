import React from 'react';
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PetCard = ({ details }) => {
    const { _id, name, image, age, location } = details;

    return (
        <Card className="max-w-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
            <div className="">
                <img src={image} alt={`${name} image`}
                    className="w-full h-48 object-cover rounded-t-2xl" />
            </div>

            <CardBody className="p-4 rounded-t-[30%]  -mt-8 z-20  bg-white border-t">
                <Typography variant="h5" color="blue-gray" className="mb-1 font-bold text-center">
                    {name}
                </Typography>
                <Typography color="gray" className="text-sm text-center mb-2">
                    {/* Puppy • Wirehaired Terrier */}
                    Age • {age} days
                </Typography>
                <div className="flex items-center justify-center text-gray-600">
                    <FaMapMarkerAlt size={15} className="mr-1" />
                    <Typography color="gray" className="text-sm">
                        {location}
                    </Typography>
                </div>
            </CardBody>

            <CardFooter className="pt-0">
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