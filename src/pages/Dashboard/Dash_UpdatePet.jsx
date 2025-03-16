import React, { useState } from 'react';
import useMyaddedpet from '../../hooks/useMyaddedpet';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import Select from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "rgb(38, 38, 38)", // Dark background
        borderRadius: "0.5rem",
        padding: "0.25rem",
        borderColor: "rgb(75, 75, 75)", // Darker border
        "&:hover": {
            borderColor: "rgb(125, 125, 125)", // Slightly lighter border on hover
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "rgb(45, 45, 45)", // Darker menu background
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
            ? "rgb(75, 75, 75)" // Darker focus color
            : "rgb(45, 45, 45)", // Darker background
        color: "rgb(245, 245, 245)", // Light text
        padding: "0.5rem",
    }),
};

const category = [
    { value: "Cat", label: "Cat" },
    { value: "Dog", label: "Dog" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Horse", label: "Horse" },
    { value: "Fish", label: "Fish" },
    { value: "Others", label: "Others" },
];

const hostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${hostingKey}`;

// main function starts from here.......
const Dash_UpdatePet = () => {
    const params = useParams();
    const { myAddedpets } = useMyaddedpet();
    const updatePet = myAddedpets.find(data => data._id === params.id);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const defaultCategory = category.find(d => d.value === updatePet?.category);
    const [categorySelected, setCategory] = useState(defaultCategory);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const imgFile = { image: data.image[0] };
        const res = await axios.post(imgHostingApi, imgFile, {
            headers: { 'content-Type': 'multipart/form-data' }
        });

        if (res.data.success) {
            const image = res.data.data.display_url;
            const petAddTime = new Date().toLocaleString();
            const updatedPetInfo = {
                name: data.name,
                image: image,
                age: data.age,
                category: categorySelected.value,
                location: data.location,
                sortDescription: data.sortDescription,
                fullDesciption: data.fullDesciption,
                petAddTime: petAddTime,
            };

            axiosSecure.patch(`/update/pet/${params.id}`, updatedPetInfo)
                .then(res => {
                    if (res.data) {
                        setLoading(false);
                        toast.success('Pet Updated');
                        navigate('/dashboard/my-added-pets');
                    }
                })
                .catch(() => {
                    toast.error('Failed to update');
                    setLoading(false);
                });
        } else {
            toast.error('Failed to update');
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#424242] min-h-[calc(100vh-60px)] text-white">
            <p className="bg-[#212121] py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center">
                Update pet info...
            </p>

            <div className='w-96 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-[#424242] p-6 rounded-lg shadow-md">
                    <div className='mt-10'>
                        <Input
                            {...register("image")}
                            size="lg"
                            type="file"
                            color="purple"
                            label='Add a img'
                            required
                            className='cursor-pointer file:cursor-pointer file:text-sm file:bg-none file:border-0 file:h-full'
                        />
                    </div>

                    <div className='mt-7'>
                        <Input
                            {...register("name")}
                            size="lg"
                            type="text"
                            color="purple"
                            label="Name"
                            required
                            defaultValue={updatePet?.name}
                            className="bg-gray-700 text-white"
                        />
                    </div>

                    <div className='mt-7'>
                        <Input
                            {...register("age")}
                            size="lg"
                            type="number"
                            min={1}
                            color="purple"
                            label="Age"
                            required
                            defaultValue={updatePet?.age}
                            className="bg-gray-700 text-white"
                        />
                    </div>

                    <div className='mt-7'>
                        <Select
                            isClearable
                            options={category}
                            defaultValue={categorySelected}
                            onChange={(d) => setCategory(d)}
                            placeholder="Select the category*"
                            styles={customStyles}
                            required
                        />
                    </div>

                    <div className='mt-7'>
                        <Input
                            {...register("location")}
                            size="lg"
                            type="text"
                            color="purple"
                            label="Location"
                            required
                            defaultValue={updatePet?.location}
                            className="bg-gray-700 text-white"
                        />
                    </div>

                    <div className='mt-7'>
                        <Input
                            {...register("sortDescription")}
                            size="lg"
                            type="text"
                            color="purple"
                            label="Sort description"
                            required
                            defaultValue={updatePet?.sortDescription}
                            className="h-12 bg-gray-700 text-white"
                        />
                    </div>

                    <div className='mt-7'>
                        <Textarea
                            {...register('fullDesciption')}
                            color="purple"
                            rows={10}
                            label="Full description of the pet*"
                            required
                            defaultValue={updatePet?.fullDesciption}
                            className="bg-gray-700 text-white"
                        />
                    </div>

                    <br />
                    <button className='w-full'>
                        <Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dash_UpdatePet;
