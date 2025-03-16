import { Button, Input, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { allContext } from '../../authprovider/Authprovider';
import { useNavigate, useParams } from 'react-router-dom';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const hostingKey = import.meta.env.VITE_imgHostingKey;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${hostingKey}`

const Dash_Update_Campaign = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const params = useParams()
    const { myDonationCampaign } = useDonationCampagin()
    const editCampaign = myDonationCampaign.find(data => data._id === params.id)

    const date = new Date()
    const { user } = useContext(allContext)
    const currentDate = date.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const [createLoading, setCreateLoading] = useState(false)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: editCampaign?.name,
            maxDonationAmount: editCampaign?.maxDonationAmount,
            lastDateofDonation: editCampaign?.lastDateofDonation,
            sortDescription: editCampaign?.sortDescription,
            fullDesciption: editCampaign?.fullDesciption
        }
    })

    const onSubmit = async (data) => {
        let picture = editCampaign?.image
        const imgFile = { image: data.image[0] }

        // if image exists, upload the image to imgbb 
        if (imgFile?.image?.name) {
            const res = await axios.post(imgHostingApi, imgFile, {
                headers: { 'content-Type': 'multipart/form-data' }
            })
            if (res.data.success) {
                const display_url = res.data.data.display_url
                picture = display_url
            } else {
                toast.error('Failed to add image')
            }
        }

        const campaignCreatedTime = new Date().toLocaleString();
        const updatedData = { ...data, image: picture, campaignOwner: user.email, campaignCreatedTime: campaignCreatedTime }
        axiosSecure.patch(`/donation-campaign/${params.id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Campaign info updated')
                    navigate('/dashboard/my-donation-campaign')
                } else {
                    toast.error('Failed to update')
                }
            })
            .catch(err => toast.error('Something went wrong'))
    }

    return (
        <div className='bg-[#424242] min-h-[calc(100vh-60px)] text-white'>
            <p className='bg-[#212121] py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center'>Update Donation Campaign</p>

            <div className='w-96 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='mt-7'>
                        <Input {...register("name")} size="lg" type='text' color="purple" label="Campaign Name" required className="bg-[#333333] text-white border-[#444444]" />
                    </div>

                    <div className='mt-10'>
                        <Input {...register("image")} size="lg" type="file" color="purple" label="Campaign Image" accept="image/*"
                            className='cursor-pointer file:cursor-pointer file:text-sm file:bg-none file:border-0 file:h-full bg-[#333333] text-white border-[#444444]' />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("maxDonationAmount")} size="lg" type='number' min={1} color="purple" label="Donation Needed" required className="bg-[#333333] text-white border-[#444444]" />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("lastDateofDonation")} size="lg" type='date' color="purple" label="Last Date of Donation" required min={currentDate} className="bg-[#333333] text-white border-[#444444]" />
                    </div>

                    <div className='mt-7'>
                        <Input {...register("sortDescription")} size="lg" type="text" className='h-12 bg-[#333333] text-white border-[#444444]' color="purple" label="Short Description" required />
                    </div>

                    <div className='mt-7'>
                        <Textarea {...register('fullDesciption')} color="purple" rows={10} label="Full Description" required className="bg-[#333333] text-white border-[#444444]" />
                    </div>

                    <br />
                    <button className='w-full'>
                        <Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                            {createLoading ? 'Updating...' : 'Update'}
                        </Button>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dash_Update_Campaign;
