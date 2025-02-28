import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { allContext } from '../../authprovider/Authprovider';
import { TiTick } from "react-icons/ti";
import { MdCancel, MdOutlineCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Dash_AoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(allContext)

    const { data: adoptionRequest = [], refetch } = useQuery({
        queryKey: [user.email, 'adoption-request'],
        queryFn: async () => {
            const res = await axiosSecure(`/adoption-request?email=${user.email}`)
            return res.data
        }
    })
    console.log(adoptionRequest);

    const handleAccept = (id) => {
        console.log(id);
        axiosSecure.patch(`/change/adopted-status/${id}`)
            .then(res => {
                console.log(res);
                if (res.data.modifiedCount > 0) {
                    axiosSecure.delete(`/adoption-request/${id}`)
                        .then(res => {
                            refetch()
                            Swal.fire({
                                title: "Accept",
                                text: "Pet adoption request accept",
                                icon: "success"
                            });
                        })
                        .catch(error => console.log(error))
                }else{
                    toast.error('Pet already adopted')
                }
            })
            .catch(err => console.log(err))
    }

    const handleReject = (id) => {
        console.log('reject id', id);
        axiosSecure.delete(`/adoption-request/${id}`)
            .then(res => {
                console.log(res);
                toast.success('Rejected')
                refetch()
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Adoption Reqest</p>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border border-gray-300 px-4 py-2">SL no.</th>
                            <th className="border border-gray-300 px-4 py-2">Pet name</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Phone number</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                            <th className="border border-gray-300 px-4 py-2">Acccept</th>
                            <th className="border border-gray-300 px-4 py-2">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptionRequest.map((data, index) => (
                            <tr key={data._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{data.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <div className='flex justify-center'>
                                        {
                                            <img src={data.image} className='w-16 h-16 object-cover rounded-lg' alt="" />
                                        }
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{data.requestorInfo.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{data.requestorInfo.phoneNumber}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{data.requestorInfo.address}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => handleAccept(data.pet_id)}>
                                        {<TiTick size={26} />}
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => handleReject(data.pet_id)}>
                                        {<MdOutlineCancel size={22} />}
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dash_AoptionRequest;