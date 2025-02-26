import { useForm } from 'react-hook-form';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import Select from 'react-select';
import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { allContext } from '../../authprovider/Authprovider';

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


const Dash_Addpet = () => {
    const { register, handleSubmit } = useForm()
    const { user } = useContext(allContext)
    const [categrie, setCategory] = useState(null)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    
    // addition security --- to avoid adding multiple click to add data
    const [isPetExist, setisPetExist] = useState({})

    const onSubmit = async (data) => {

        // additional checking --- to avoid adding multiple click to add data
        setisPetExist(data)
        if(isPetExist?.name){
            return toast.error('Pet data just added')
        }

        const imgFile = { image: data.image[0] }
        const res = await axios.post(imgHostingApi, imgFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const image = res.data.data.display_url
            const petAddTime = new Date().toLocaleString();
            const petInfo = {
                name: data.name,
                image: image,
                age: data.age,
                category: categrie.value,
                location: data.location,
                sortDescription: data.sortDescription,
                fullDesciption: data.fullDesciption,
                petAddTime: petAddTime,
                adopted: false,
                petOwner: user.email
            }

            axiosSecure.post('/add-pet', petInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success('Pet added')
                        navigate('/dashboard/my-added-pets')
                    }
                })
                .catch(() => {
                    toast.error('Failed to add a pet')
                })
        } else {
            toast.error('Failed to add')
        }
    }


    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Add Pet</p>

            <div className='w-96 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='mt-10'>
                        <Input {...register("image")} size="lg" type="file" color="purple" label="Select Profile picture" required
                         accept="image/*" 
                            className='cursor-pointer file:cursor-pointer file:text-sm file:bg-none file:border-0 file:h-full ' />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("name")} size="lg" type="text" color="purple" label="Name" required />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("age")} size="lg" type="number" min={1} color="purple" label="Age" required />
                    </div>

                    <div className='mt-7'>
                        <Select isClearable options={category} onChange={(d) => setCategory(d)} placeholder="Select the category*" styles={customStyles} required />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("location")} size="lg" type="text" color="purple" label="Location" required />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("sortDescription")} size="lg" type="text" className='h-12' color="purple" label="Sort description" required />
                    </div>

                    <div className='mt-7'>
                        <Textarea {...register('fullDesciption')} color="purple" rows={10} label="Full description of the pet*" required />
                    </div>

                    <br />
                    <button className='w-full'><Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                        Submit</Button></button>
                </form>
            </div>
        </div>
    );
};

export default Dash_Addpet;