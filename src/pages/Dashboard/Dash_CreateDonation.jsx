import { Button, Input, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { allContext } from '../../authprovider/Authprovider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const hostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${hostingKey}`

const Dash_CreateDonation = () => {
    const date = new Date()
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(allContext)
    const { register, handleSubmit } = useForm()
    const currentDate = date.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const [createLoading, setCreateLoading] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setCreateLoading(true)
        const imgFile = { image: data.image[0] }
        const res = await axios.post(imgHostingApi, imgFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const display_url = res.data.data.display_url
            const campaignCreatedTime = new Date().toLocaleString();
            const campaignData = {
                ...data, image: display_url,
                campaignCreatedTime: campaignCreatedTime,
                campaignOwner: user?.email,
                totalDonation: 0,
                pauseDonation: false,
            }

            axiosSecure.post('/donation-campaign', campaignData)
                .then(res => {
                    if (res.data.insertedId) {
                        setCreateLoading(false)
                        toast.success('Succesfully added')
                        navigate('/dashboard/my-donation-campaign')
                    } else {
                        toast.error('failed to add')
                    }
                })

        } else {
            toast.error('Failed to add')
        }
    }

    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Create Donation Campaign</p>

            <div className='w-96 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='mt-7'>
                        <Input {...register("name")} size="lg" type='text' color="purple" label="Pet name" required />
                    </div>

                    <div className='mt-10'>
                        <Input {...register("image")} size="lg" type="file" color="purple" label="Pet picture" accept="image/*" required
                            className='cursor-pointer file:cursor-pointer file:text-sm file:bg-none file:border-0 file:h-full ' />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("maxDonationAmount")} size="lg" type='number' min={1} color="purple" label="Donation needed" required />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("lastDateofDonation")} size="lg" type='date' color="purple" label="Last date of donation" required min={currentDate} />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("sortDescription")} size="lg" type="text" className='h-12' color="purple" label="Sort description" required />
                    </div>

                    <div className='mt-7'>
                        <Textarea {...register('fullDesciption')} color="purple" rows={10} label="Full description of the pet*" required />
                    </div>

                    <br />
                    <button className='w-full'><Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                        {createLoading ? 'Submiting' : 'Submit'} </Button></button>
                </form>
            </div>

        </div>
    );
};

export default Dash_CreateDonation;