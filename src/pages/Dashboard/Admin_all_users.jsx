import React from 'react';

const Admin_all_users = () => {
    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>Users</p>


            {/* <div className="overflow-x-auto w-full">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myAddedpets.map((user, index) => (
                            <tr key={user._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {user.role === "admin" ? (
                                        <span className="text-green-600 font-medium">Admin</span>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
                                        >
                                            <FaUsers className="text-xl" />
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="text-red-600 hover:text-red-800 flex items-center gap-2"
                                    >
                                        <FaTrashAlt className="text-xl" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

        </div>
    );
};

export default Admin_all_users;