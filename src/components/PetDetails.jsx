import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import formatDate from "./formatDate/formatDate";
import { Button } from "@material-tailwind/react";
import Loading from "../shared/Loading";
import Modal from 'react-modal';
import { useState } from "react";
import AdoptionRequest from "../pages/pet-listing/AdoptionRequest";

const PetDetails = () => {
    const param = useParams();
    const axiosSecure = useAxiosSecure();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { data: details = [], refetch, isLoading, isError, error } = useQuery({
        queryKey: [`pet-details`, param],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet-details/${param.id}`);
            return res.data;
        }
    });

    if (isLoading) return <p className="min-h-[calc(100vh-393px)]"><Loading /></p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    const { adopted, age, category, fullDesciption, image, location, name, petAddTime, petOwner, sortDescription, _id } = details;

    return (
        <div className="p-20 min-h-[calc(100vh-393px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto rounded-xl">
                <div className="bg-black">
                    <img src={image} className="w-full h-[500px] object-contain" alt="" />
                </div>

                <div className="p-7  bg-white dark:bg-gray-800 rounded-b-lg">
                    <div className="flex justify-between">
                        <p className="text-5xl font-semibold">{name}</p>
                        <Button onClick={() => setModalIsOpen(true)} color="blue" className='px-8 py-3 rounded-3xl border-2 border-[#3f83f8] text-sm flex items-center' >
                            Adopt
                        </Button>
                    </div>

                    <p className="text-xl my-3">{category} | <span>{location}</span></p>
                    <p>{sortDescription}</p>
                    <div className="w-full my-5 h-[2px] bg-gray-600 dark:bg-gray-500"></div>
                    <h3 className="text-2xl font-medium">About --- {name}</h3>
                    <p className="mt-4 text-xl">Age : {age} days</p>
                    <p className="mt-2 text-xl">Desciption : <span className="text-base">{fullDesciption}</span></p>

                    <div className="flex items-center mt-8 justify-between">
                        <p><span className="text-xl">Owner :</span> {petOwner}</p>
                        <p><span className="text-xl">Pet added time</span> : {formatDate(petAddTime)}</p>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} ariaHideApp={true} contentLabel="Donation Modal" overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
                className="bg-white dark:bg-gray-800 p-6 w-96 rounded-lg shadow-lg mx-auto text-gray-900 dark:text-gray-100">
                <AdoptionRequest details={details} setModalIsOpen={setModalIsOpen} />
            </Modal>
        </div>
    );
};

export default PetDetails;