import { Button, Input } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { allContext } from '../../authprovider/Authprovider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdoptionRequest = ({ details, setModalIsOpen }) => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useContext(allContext)
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        const allInfo = {
            pet_id: details._id,
            name: details.name,
            image: details.image,
            petOwner: details.petOwner,
            requestorInfo: {
                ...data,
            }
        }
        axiosSecure.post('/adoption-request', allInfo)
            .then(res => {
                if (res.data.insertedId) {
                    setModalIsOpen(false)
                    toast.success('Adoption request successed')
                }
            })
            .catch(error => {
                toast.error('Failed to do adoption request')
                console.log(error);
            })
    }

    return (
        <div className="dark:bg-gray-800 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className='text-3xl font-semibold text-center text-blue-900 dark:text-blue-300 uppercase'>{details.name}</p>
                <div className='mt-7'>
                    <Input {...register("name")} className='cursor-not-allowed dark:text-white' size="lg" value={user.displayName} type="text"  color="purple" label="Name" required />
                </div>
                <div className='mt-7'>
                    <Input {...register("email")} className='cursor-not-allowed  dark:text-white' size="lg" value={user.email} type="email" color="purple" label="Email" required />
                </div>
                <div className='mt-7'>
                    <Input {...register("phoneNumber")} className=' dark:text-white' size="lg" type="number" color="purple" label="Enter your phone number" required />
                </div>
                <div className='mt-7'>
                    <Input {...register("address")} className=' dark:text-white' size="lg" type="text" color="purple" label="Enter your address" required />
                </div>
                <div className='flex justify-evenly mt-7'>
                    <button className='w-full'>
                        <Button color="blue" className='px-8 py-3 rounded-3xl border-2 border-[#3f83f8] text-sm flex items-center'>
                            Submit</Button>
                    </button>
                    <Button onClick={() => setModalIsOpen(false)} color="blue" className='px-8 py-3 rounded-3xl border-2 border-[#3f83f8] text-sm flex items-center'>
                        Cancel</Button>
                </div>
            </form>
        </div>
    );
};

export default AdoptionRequest;
