import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Admin_all_users = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {
        console.log(user);
        axiosSecure.patch(`/user/make-admin?email=${user.email}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This user is now admin",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
            .catch(err => toast.error('Something wrong happen'))
    }

    const handleDeleteUser = (user) => {
        console.log(user);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete/user?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => toast.error('Something wrong happen'))
            }
        });
    }

    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Users</p>


            <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border border-gray-300 px-4 py-2">SL no.</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{'img goes herw'}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center flex justify-center">
                                    {user.role == "admin"
                                        ? <button className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'>
                                            Admin</button>
                                        : <button
                                            onClick={() => handleMakeAdmin(user)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2">
                                            {/* <FaUsers className="text-xl" /> */}
                                            Make Admin </button>
                                    }
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex justify-center'>
                                        <button
                                            onClick={() => handleDeleteUser(user)} className="text-red-600 hover:text-red-800 flex items-center gap-2">
                                            <FaTrashAlt className="text-xl" />
                                            Delete
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

export default Admin_all_users;