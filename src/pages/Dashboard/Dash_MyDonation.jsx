import React, { useContext } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { allContext } from '../../authprovider/Authprovider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button } from '@material-tailwind/react';
import imgNotFound from '../../assets/img-not-found.jpg'

const Dash_MyDonation = () => {
    const { user } = useContext(allContext)
    const axiosSecure = useAxiosSecure()

    const { data: myDonations = [] } = useQuery({
        queryKey: ['donation', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-history')
            const currentUserHistory = res.data.filter(e => e.donatorDetails.email == user.email)
            return currentUserHistory
        }
    })
    console.log("myDonations", myDonations);
    const columns = React.useMemo(
        () => [
            {
                id: 'serialNumber',
                header: 'SL No.',
                accessorFn: (row, index) => index + 1,
            },
            {
                accessorKey: 'petName',
                header: 'Pet name',
            },
            {
                id: 'Pet image',
                header: 'Pet image',
                accessorKey:'petImage',
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <img
                            src={row.original.petImage}
                            alt={`${row.original.name || 'Pet'}`}
                            className="h-16 border w-16 object-cover rounded-lg" />
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
                cell: ({ row }) => (
                    <div className=''>
                        <Button color="blue" ripple={true} className="py-3 rounded-lg font-medium">
                            Refund</Button>
                    </div >
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
        <div className='bg-gray-200 min-h-[calc(100vh-60px)]'>
            <p className='bg-white py-4 shadow-sm px-7 tracking-wider font-semibold  text-xl flex items-center'>My Donation</p>

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

export default Dash_MyDonation;