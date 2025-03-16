import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useContext, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaUsers } from 'react-icons/fa';
import { CiPlay1 } from "react-icons/ci";
import { RiPauseFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import useDonationCampagin from '../../hooks/useDonationCampagin';
import { allContext } from '../../authprovider/Authprovider';
import ProgressBar from '@ramonak/react-progress-bar';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

Modal.setAppElement('#root');

const Dash_MyDonationCampaign = () => {
    const { user } = useContext(allContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { myDonationCampaign, refetch } = useDonationCampagin();
    const [cbasedDonators, setcbasedDonators] = useState([]);

    const MydonateCampaing = useMemo(() => {
        return myDonationCampaign.filter(e => e.campaignOwner === user.email);
    }, [myDonationCampaign, user.email]);

    const { data: donators = [], isLoading } = useQuery({
        queryKey: ['donators'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-history');
            return res.data;
        }
    });

    const handleUpdate = (id) => {
        navigate(`/dashboard/update-donation-campaign/${id}`);
    };

    const handlePauseDonation = (id) => {
        axiosSecure.patch(`/change/pauseDonation-status/${id}`)
            .then(res => {
                toast.success(res?.data?.pauseDonation ? 'Donation paused' : 'Donation Resumed');
                refetch();
            })
            .catch(error => console.log(error));
    };

    const viewDonators = async (ids) => {
        const filtered = donators.filter(e => e?.donationRequestorInfo?.campaignID == ids);
        setcbasedDonators(filtered);
        setModalIsOpen(true);
    };

    const columns = useMemo(() => [
        { id: 'serialNumber', header: 'SL No.', accessorFn: (row, index) => index + 1 },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'maxDonationAmount', header: 'Donation-needed', cell: ({ row }) => <div>{row.original.maxDonationAmount} tk</div> },
        { accessorKey: 'Progress', header: 'Progress', cell: ({ row }) => (
            <ProgressBar isLabelVisible={false} completed={((row.original.totalDonation / row.original.maxDonationAmount) * 100).toFixed(1)} maxCompleted={100} />
        ) },
        { id: 'update', header: 'Update', cell: ({ row }) => (
            <button onClick={() => handleUpdate(row.original._id)} className="text-blue-600 hover:text-blue-800">
                <FaRegEdit />
            </button>
        ) },
        { accessorKey: 'adopteds', header: 'Pause Donation', cell: ({ row }) => (
            <button className='px-1' onClick={() => handlePauseDonation(row.original._id)}>
                {row.original.pauseDonation ? <CiPlay1 size={20} /> : <RiPauseFill size={20} />}
            </button>
        ) },
        { accessorKey: 'View-donators', header: 'Donators', cell: ({ row }) => (
            <button className='lg:px-1' onClick={() => viewDonators(row.original._id)}>
                <FaUsers size={20} />
            </button>
        ) }
    ], []);

    const table = useReactTable({ data: MydonateCampaing, columns, getCoreRowModel: getCoreRowModel() });

    return (
        <div className='bg-[#424242] min-h-[calc(100vh-60px)] text-white'>
            <p className='bg-[#212121] py-4 shadow-sm px-7 tracking-wider font-semibold text-xl flex items-center'>My Donation Campaign</p>
            <div className="p-4">
                {isLoading ? (
                    <Skeleton count={5} height={40} className="mb-2" />
                ) : MydonateCampaing.length === 0 ? (
                    <p className='text-center text-gray-400 mt-4'>No donation history found.</p>
                ) : (
                    <table className="w-full bg-[#2d2d2d] shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-[#212121]">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="px-6 py-3 text-center border text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-[#2d2d2d] divide-y divide-gray-600">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 text-center border-r whitespace-nowrap text-sm text-gray-300">
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

export default Dash_MyDonationCampaign;
