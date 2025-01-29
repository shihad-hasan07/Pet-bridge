import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FaRegEdit, } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Button } from '@material-tailwind/react';
import Swal from 'sweetalert2';
import useMyaddedpet from '../../hooks/useMyaddedpet';
import { useNavigate } from 'react-router-dom';

const Dash_MyAddedPet = () => {
    const axiosSecure = useAxiosSecure();
    const navigate=useNavigate()
    const {myAddedpets,refetch,isLoading}=useMyaddedpet()

    const handleUpdate=(id)=>{
        navigate(`/dashboard/update-pet/${id}`)
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
    // Define columns with the new syntax
    const columns = React.useMemo(
        () => [
            {
                id: 'serialNumber',
                header: 'SL No.',
                accessorFn: (row, index) => index + 1,
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'image',
                header: 'Image',
                cell: ({ row }) => (
                    <div className="w-16 h-16 relative">
                        <img
                            src={row.original.image}
                            alt={`${row.original.name || 'Pet'}`}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                                e.target.src = 'https://placeholder.com/150'; // Your fallback image
                            }}
                        />
                    </div>
                )
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'adoption status',
                header: 'Adoption status',
                cell: ({ row }) => (
                    <div className='relative text-gray-600'>
                        {
                            row.original.adopted ? "Adopted" : "Not adopted"
                        }
                    </div>
                )
            },
            {
                id: 'update',
                header: 'Update',
                cell: ({ row }) => (
                    <div >
                        <button
                        onClick={()=>handleUpdate(row.original._id)}
                            className="text-blue-600 ml-4 hover:text-blue-800"
                        ><FaRegEdit></FaRegEdit>
                        </button>
                    </div>
                ),
            },
            {
                id: 'delete',
                header: 'Delete',
                cell: ({ row }) => (
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        className=" text-blue-600 ml-2 hover:text-blue-800"
                    ><MdOutlineDeleteForever size={20} />
                    </button>
                ),
            },
            {
                accessorKey: 'adopted',
                header: 'Change status',
                cell: ({ row }) => (
                    <div className=''>
                        {
                            (row.original.adopted)
                                ? <div><button className='w-full py-3 rounded-lg font-medium bg-blue-gray-300 cursor-not-allowed text-gray-50' disabled>ADOPTED</button></div>
                                : <div><button onClick={() => makedopted(row.original._id)}
                                    className='w-full'><Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                                        make adopted</Button></button></div>
                        }
                    </div>
                ),
            }
        ],
        []
    );

    const table = useReactTable({
        data: myAddedpets,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="bg-gray-200 min-h-[calc(100vh-60px)]">
            <p className="bg-white py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center">
                My Added Pets <span className='ml-2'>({myAddedpets?.length})</span>
            </p>

            <div className="p-4">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dash_MyAddedPet;