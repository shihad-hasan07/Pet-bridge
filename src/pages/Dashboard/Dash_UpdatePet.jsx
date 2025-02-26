import React from 'react';
import useMyaddedpet from '../../hooks/useMyaddedpet';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import Select from 'react-select';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "rgb(238, 238, 238)", // Tailwind 'bg-gray-200'
        borderRadius: "0.5rem", // Tailwind 'rounded-lg'
        padding: "0.25rem", // Tailwind 'p-1'
        borderColor: "rgb(209 213 219)", // Tailwind 'border-gray-300'
        "&:hover": {
            borderColor: "rgb(156 163 175)", // Tailwind 'hover:border-gray-400'
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "rgb(243 244 246)", // Tailwind 'bg-gray-100'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused
            ? "rgb(209 213 219)" // Tailwind 'bg-gray-300'
            : "rgb(243 244 246)", // Tailwind 'bg-gray-100'
        color: "rgb(17 24 39)", // Tailwind 'text-gray-900'
        padding: "0.5rem", // Tailwind 'p-2'
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
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${hostingKey}`

// main function starts from here.......
const Dash_UpdatePet = () => {
    const params = useParams()
    const { myAddedpets } = useMyaddedpet()
    const updatePet = myAddedpets.find(data => data._id === params.id)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const defaultCategory = category.find(d => d.value == updatePet?.category)
    const [categrie, setCategory] = useState(defaultCategory)

    const [loadding,setloadding]=useState(false)

    const { register, handleSubmit } = useForm();


    // onsubmit function
    const onSubmit = async (data) => {
        setloadding(true)
        const imgFile = { image: data.image[0] }
        const res = await axios.post(imgHostingApi, imgFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const image = res.data.data.display_url
            const petAddTime = new Date().toLocaleString();
            const updatedPetInfo = {
                name: data.name,
                image: image,
                age: data.age,
                category: categrie.value,
                location: data.location,
                sortDescription: data.sortDescription,
                fullDesciption: data.fullDesciption,
                petAddTime: petAddTime,
            }

            axiosSecure.patch(`/update/pet/${params.id}`, updatedPetInfo)
                .then(res => {
                    if (res.data) {
                        setloadding(false)
                        toast.success('Pet Updated')
                        navigate('/dashboard/my-added-pets')
                    }
                })
                .catch(() => {
                    toast.error('Failed to update')
                })
        } else {
            toast.error('Failed to update')
        }
    }

    return (
        <div className="bg-gray-200 min-h-[calc(100vh-60px)]">
            <p className="bg-white py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center">
                Update pet info...
            </p>

            <div className='w-96 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-10'>
                        <Input {...register("image")} size="lg" type="file" color="purple" label='Add a img' required
                            className='cursor-pointer file:cursor-pointer file:text-sm file:bg-none file:border-0 file:h-full ' />
                        {/* <p>{ updatePet?.image.split('/').pop()}</p> */}
                    </div>

                    <div className='mt-7'>
                        <Input {...register("name")} size="lg" type="text" color="purple" label="Name" required defaultValue={updatePet?.name}/>
                    </div>

                    <div className='mt-7'>
                        <Input {...register("age")} size="lg" type="number" min={1} color="purple" label="Age" required defaultValue={updatePet?.age} />
                    </div>

                    <div className='mt-7'>
                        <Select isClearable options={category} defaultValue={categrie} onChange={(d) => setCategory(d)} placeholder="Select the category*" styles={customStyles} required />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("location")} size="lg" type="text" color="purple" label="Location" required defaultValue={updatePet?.location}/>
                    </div>

                    <div className='mt-7'>
                        <Input {...register("sortDescription")} size="lg" type="text" className='h-12' color="purple" label="Sort description" required defaultValue={updatePet?.sortDescription}/>
                    </div>

                    <div className='mt-7'>
                        <Textarea {...register('fullDesciption')} color="purple" rows={10} label="Full description of the pet*" required defaultValue={updatePet?.fullDesciption}/>
                    </div>

                    <br />
                    <button className='w-full'><Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                       {loadding?"Updating...":"Update"} </Button></button>
                </form>
            </div>
        </div>
    );
};

export default Dash_UpdatePet;