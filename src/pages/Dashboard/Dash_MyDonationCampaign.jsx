import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
Modal.setAppElement('#root');


const Dash_MyDonationCampaign = () => {
    const { user } = useContext(allContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { myDonationCampaign, refetch } = useDonationCampagin()

    const [cbasedDonators, setcbasedDonators] = useState([])

    const MydonateCampaing = useMemo(() => {
        return myDonationCampaign.filter(e => e.campaignOwner === user.email);
    }, [myDonationCampaign, user.email]);

    const { data: donators = [], isLoading } = useQuery({
        queryKey: ['donators'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donation-history')
            return res.data
        }
    })

    const handleUpdate = (id) => {
        console.log(id);
        navigate(`/dashboard/update-donation-campaign/${id}`)
    }

    const handlePauseDonation = (id) => {
        // const filter = MydonateCampaing.find(e => e._id == id)
        axiosSecure.patch(`/change/pauseDonation-status/${id}`)
            .then(res => {
                if (res?.data?.pauseDonation) {
                    toast.success('Donation paused')
                } else {
                    toast.success('Donation Resumed')
                }
                refetch()
            })
            .catch(error => console.log(error))
    }

    const viewDonators = async (ids) => {
        const filtered = await donators.filter(e => e?.donationRequestorInfo?.campaignID == ids)
        setcbasedDonators(filtered)

        setModalIsOpen(true)
        // console.log('all', donators);
        // console.log('filtered', filtered);
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
                        <ProgressBar
                            isLabelVisible={false}
                            completed={((row.original.totalDonation / row.original.maxDonationAmount) * 100).toFixed(1)} maxCompleted={100} />
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
                        <button className='px-1'
                            onClick={() => handlePauseDonation(row.original._id)}>
                            {
                                row.original.pauseDonation ? <CiPlay1 size={20} /> : <RiPauseFill size={20} />
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
                        <button className='lg:px-1'
                            onClick={() => viewDonators(row.original._id)}>
                            <FaUsers size={20} />
                        </button>
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

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={true} contentLabel="Donation Modal" overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
                className="bg-white p-6 w-96 rounded-lg shadow-lg  mx-auto" >

                <div>
                    <p className='text-2xl font-semibold mb-3'>Donator list ( {cbasedDonators ? cbasedDonators.length : ''} )</p>
                    {
                        cbasedDonators?.map((data, index) => (
                            <div key={data?._id} className='flex gap-2 mt-1'>
                                <p>{index + 1}.</p>
                                <p className='first-letter:uppercase'>{data?.donatorDetails?.name}</p>
                                <p>---- {data?.donatorDetails?.donationAmount}</p>
                            </div>
                        ))
                    }
                </div>

                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setModalIsOpen(false)}>
                    closse</button>
            </Modal>

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