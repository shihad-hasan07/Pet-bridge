import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { allContext } from '../../authprovider/Authprovider';
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Dash_AoptionRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(allContext);

    const { data: adoptionRequest = [], refetch } = useQuery({
        queryKey: [user.email, 'adoption-request'],
        queryFn: async () => {
            const res = await axiosSecure(`/adoption-request?email=${user.email}`);
            return res.data;
        }
    });

    const handleAccept = (id) => {
        axiosSecure.patch(`/change/adopted-status/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    axiosSecure.delete(`/adoption-request/${id}`)
                        .then(() => {
                            refetch();
                            Swal.fire({
                                title: "Accepted",
                                text: "Pet adoption request accepted",
                                icon: "success"
                            });
                        })
                        .catch(error => console.log(error));
                } else {
                    toast.error('Pet already adopted');
                }
            })
            .catch(err => console.log(err));
    };

    const handleReject = (id) => {
        axiosSecure.delete(`/adoption-request/${id}`)
            .then(() => {
                toast.success('Rejected');
                refetch();
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='bg-[#333333] min-h-[calc(100vh-60px)] text-white'>
            <p className='bg-[#212121] py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center'>
                Adoption Request
            </p>
            <div className="overflow-x-auto w-full p-4">
                <table className="min-w-full border-collapse border border-gray-600">
                    <thead className="bg-[#444444]">
                        <tr>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">SL No.</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Pet Name</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Image</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Name</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Phone Number</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Location</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Accept</th>
                            <th className="border border-gray-600 px-4 py-2 text-xs font-medium text-gray-300">Reject</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {adoptionRequest.map((data, index) => (
                            <tr key={data._id} className={index % 2 === 0 ? "bg-[#424242]" : "bg-[#333333]"}>
                                <td className="border border-gray-600 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-600 px-4 py-2 text-center">{data.name}</td>
                                <td className="border border-gray-600 px-4 py-2 text-center">
                                    <div className="flex justify-center">
                                        <img src={data.image} className="w-16 h-16 object-cover rounded-lg" alt="pet" />
                                    </div>
                                </td>
                                <td className="border border-gray-600 px-4 py-2 text-center">{data.requestorInfo.name}</td>
                                <td className="border border-gray-600 px-4 py-2 text-center">{data.requestorInfo.phoneNumber}</td>
                                <td className="border border-gray-600 px-4 py-2 text-center">{data.requestorInfo.address}</td>
                                <td className="border border-gray-600 px-4 py-2 text-center">
                                    <button onClick={() => handleAccept(data.pet_id)} className="text-green-500">
                                        <TiTick size={26} />
                                    </button>
                                </td>
                                <td className="border border-gray-600 px-4 py-2 text-center">
                                    <button onClick={() => handleReject(data.pet_id)} className="text-red-500">
                                        <MdOutlineCancel size={22} />
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
