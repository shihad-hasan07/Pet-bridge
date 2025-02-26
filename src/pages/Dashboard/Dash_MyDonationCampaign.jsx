import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { CiPlay1 } from "react-icons/ci";
import { RiPauseFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import { allContext } from '../../authprovider/Authprovider';

const Dash_MyDonationCampaign = () => {
    const { user } = useContext(allContext)

    const { myDonationCampaign } = useDonationCampagin()
    const MydonateCampaing = useMemo(() => {
        return myDonationCampaign.filter(e => e.campaignOwner === user.email);
    }, [myDonationCampaign, user.email]);

    const navigate = useNavigate()
    const [donationPause, setDonationPause] = useState(false)

    const handleUpdate = (id) => {
        console.log(id);
        navigate(`/dashboard/update-donation-campaign/${id}`)
    }

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
                accessorKey: 'maxDonationAmount',
                header: 'Max Donation-amount',
                cell: ({ row }) => (
                    <div>
                        {row.original.maxDonationAmount} tk
                    </div>
                )
            },
            {
                accessorKey: 'Progress',
                header: 'Progress ',
                cell: ({ row }) => (
                    <div className='relative text-gray-600'>
                        progress bar
                        {/* {
                            row.original.adopted ? "Adopted" : "Not adopted"
                        } */}
                    </div>
                )
            },
            {
                id: 'update',
                header: 'Update',
                cell: ({ row }) => (
                    <div >
                        <button
                            onClick={() => handleUpdate(row.original._id)}
                            className="text-blue-600 hover:text-blue-800"
                        ><FaRegEdit></FaRegEdit>
                        </button>
                    </div>
                ),
            },

            {
                accessorKey: 'adopteds',
                header: 'Pause Donation',
                cell: ({ row }) => (
                    <div className='flex justify-center'>
                        <button className='px-1'>
                            {
                                donationPause ? <CiPlay1 size={20} /> : <RiPauseFill size={20} />
                            }
                        </button>
                    </div>
                ),
            },
            {
                accessorKey: 'View-donators',
                header: 'Donators',
                cell: ({ row }) => (
                    <div className='flex justify-center items-center '>
                        <button className='lg:px-1'><FaUsers size={20} /></button>
                    </div>
                )
            }
        ],
        []
    );

    const table = useReactTable({
        data: MydonateCampaing,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>My Donation Campaign</p>

            <div className="p-4">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-6 py-3 text-center border text-xs font-medium text-gray-600 uppercase tracking-wider"
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
                                        className="px-6 py-4 text-center border-r whitespace-nowrap text-sm text-gray-700"
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

export default Dash_MyDonationCampaign;