import React, { useContext } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { allContext } from '../../authprovider/Authprovider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button } from '@material-tailwind/react';
import imgNotFound from '../../assets/img-not-found.jpg';

const Dash_MyDonation = () => {
    const { user } = useContext(allContext);
    const axiosSecure = useAxiosSecure();

    const { data: myDonations = [], isLoading } = useQuery({
        queryKey: ['donation', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-history');
            return res.data.filter(e => e.donatorDetails.email === user.email);
        }
    });

    const columns = React.useMemo(
        () => [
            {
                id: 'serialNumber',
                header: 'SL No.',
                accessorFn: (row, index) => index + 1,
            },
            {
                accessorKey: 'petName',
                header: 'Pet Name',
            },
            {
                id: 'Pet image',
                header: 'Pet Image',
                accessorKey: 'petImage',
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <img
                            src={row.original.petImage || imgNotFound}
                            alt={row.original.name || 'Pet'}
                            className="h-16 w-16 object-cover rounded-lg border-2 border-gray-600"
                        />
                    </div>
                )
            },
            {
                id: 'Amount',
                header: 'Donation Amount',
                cell: ({ row }) => (
                    <div className='text-base'>
                        {row.original.donatorDetails.donationAmount}
                    </div>
                )
            },
            {
                id: 'refund',
                header: 'Refund',
                cell: () => (
                    <div>
                        <Button color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                            Refund
                        </Button>
                    </div>
                )
            }
        ],
        []
    );

    const table = useReactTable({
        data: myDonations,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className='bg-[#333333] min-h-[calc(100vh-60px)] text-white'>
            <p className='bg-[#212121] py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center'>My Donation</p>
            <div className="p-4">
                {isLoading ? (
                    <div className="bg-[#424242] p-4 shadow-md rounded-lg animate-pulse">
                        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div className="h-6 bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-700 rounded w-2/3"></div>
                    </div>
                ) : myDonations.length === 0 ? (
                    <div className="bg-[#424242] p-4 shadow-md rounded-lg text-center text-gray-400">
                        No donation history found.
                    </div>
                ) : (
                    <table className="w-full bg-[#424242] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#555555]">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-center border text-xs font-medium text-gray-300 uppercase tracking-wider"
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-[#424242] divide-y divide-gray-600">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 text-center border-r whitespace-nowrap text-sm text-gray-300"
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dash_MyDonation;
