import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button } from '@material-tailwind/react';
import { FaRegEdit } from 'react-icons/fa';
import { CiPlay1 } from 'react-icons/ci';
import { RiPauseFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';

const Admin_All_Donations = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: donators = [], refetch, isLoading } = useQuery({
        queryKey: ['all donators', 'admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/allDoantion-campaign')
            return res.data
        }
    })

    const handleUpdate = (id) => {
        navigate(`/dashboard/update-donation-campaign/${id}`)
    }

    const handleDelete = (id) => {
        console.log(id);
        axiosSecure.delete(`/admin/delete/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    toast('Deleted')
                    refetch()
                }
            })
            .catch(err => console.log(err))
    }

    const handlePauseDonation = (id) => {
        axiosSecure.patch(`/change/pauseDonation-status/${id}`)
            .then(res => {
                if (res?.data?.pauseDonation) {
                    toast.success('Donation paused')
                } else {
                    toast.success('Donation Resumed')
                }
                refetch()
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>All Donations</p>

            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border border-gray-300 px-4 py-2">SL no.</th>
                            <th className="border border-gray-300 px-4 py-2">Pet name</th>
                            <th className="border border-gray-300 px-4 py-2">Progress</th>
                            <th className="border border-gray-300 px-4 py-2">Owner</th>
                            <th className="border border-gray-300 px-4 py-2">Update</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                            <th className="border border-gray-300 px-4 py-2">Pause Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donators.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">  progess  </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{user.campaignOwner}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex justify-center'>
                                        <button
                                            onClick={() => handleUpdate(user._id)}
                                            className="text-blue-600 hover:text-blue-800">
                                            <FaRegEdit></FaRegEdit>
                                        </button>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex justify-center' >
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-blue-600 hover:text-blue-800">
                                            <MdDeleteForever size={21} />
                                        </button>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex justify-center'>
                                        <button className='px-1'
                                            onClick={() => handlePauseDonation(user._id)}>
                                            {
                                                user.pauseDonation ? <CiPlay1 size={20} /> : <RiPauseFill size={20} />
                                            }
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin_All_Donations;