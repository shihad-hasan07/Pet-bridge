import React from 'react';
import useAllpets from '../../hooks/useAllpets';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Admin_All_Pets = () => {
    const { allpets, refetch, isLoading } = useAllpets()
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()


    const handleUpdate = (id) => {
        console.log(id);
        navigate(`/dashboard/admin/update-pet/${id}`)
    }

    const makedopted = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make adopoted."
        }).then((result) => {
            if (result.isConfirmed) {

                // update adopted info
                axiosSecure.patch(`/change/adopted-status/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Adopted",
                                text: "Pet adopted has been updated",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {

                // update adopted info
                axiosSecure.delete(`/my-added-pets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted",
                                text: "Pet has been Deleted",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>All Pets</p>
            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border border-gray-300 px-4 py-2">SL no.</th>
                            <th className="border border-gray-300 px-4 py-2">Pet name</th>
                            <th className="border border-gray-300 px-4 py-2">Pet owner</th>
                            <th className="border border-gray-300 px-4 py-2">Update</th>
                            <th className="border border-gray-300 px-4 py-2">Delete</th>
                            <th className="border border-gray-300 px-4 py-2">Change status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allpets.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{user.petOwner}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex justify-center'>
                                        <button
                                            onClick={() => handleUpdate(user._id)}
                                            className="text-blue-600 ml-4 hover:text-blue-800">
                                            <FaRegEdit size={19}/>
                                        </button>
                                    </div>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex justify-center items-center'>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className=" text-blue-600 hover:text-blue-800">
                                            <MdOutlineDeleteForever size={23} />
                                        </button>
                                    </div>
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <div className=''>
                                        {
                                            user.adopted ? <div>
                                                <Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium" disabled>
                                                    adopted</Button>  </div>
                                                : <div>
                                                    <button onClick={() => makedopted(user._id)}
                                                        className='w-full'><Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                                                            make adopted</Button></button>
                                                </div>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Admin_All_Pets;