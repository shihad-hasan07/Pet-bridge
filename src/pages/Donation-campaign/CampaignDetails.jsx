import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Button, Input } from '@material-tailwind/react';
import ProgressBar from "@ramonak/react-progress-bar";
import formatDate from '../../components/formatDate/formatDate'
import Modal from 'react-modal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
Modal.setAppElement('#root');

const CampaignDetails = () => {
    const id = useParams().id
    const axiosSecure = useAxiosSecure()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [donateBalance, setDonateBalance] = useState()

    const { data: details = {}, refetch } = useQuery({
        queryKey: ['details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaign-details/${id}`)
            return res.data
        }
    })

    const { lastDateofDonation, maxDonationAmount, totalDonation, pauseDonation } = details;
    const [baseError, setbaseError] = useState('')
    const date = new Date().toISOString().split("T")[0];


    useEffect(() => {
        if (pauseDonation) {
            setbaseError('Donation paused by user');
            return
        }

        if (lastDateofDonation < date) {
            setbaseError('Time over');
            return;
        }

        if ((maxDonationAmount - totalDonation) < (donateBalance / 100)) {
            setbaseError('Donation limit exceeded');
            return;
        }

        if (donateBalance < 50 || donateBalance > 999999.99) {
            setbaseError('Donation amount should be 50 paisa to  9999999.99 ');
            return;
        }


        setbaseError('');

    }, [lastDateofDonation, date, maxDonationAmount, totalDonation, donateBalance]);

    return (
        <div className='dark:bg-[#181818] pb-14 bg-[#edf9fe]'>
            <div className=' py-12 text-black'>
                <p className='text-3xl font-semibold text-center dark:text-gray-100'>"Be Their Hero – Give Love, Give Hope, Give a Home!"</p>
                <p className='mt-3 font-medium text-center mx-auto dark:text-gray-100'>"Your generosity can provides food, shelter, and care to homeless pets. <br /> Every donation brings them closer to a loving home!"</p>
            </div>

            <div className='container mx-auto gap-10 rounded-xl px-5 sm:px-5 md:px-0'>
                <div className='bg-black rounded-t-xl'>
                    <img src={details.image} className='w-full  object-contain rounded-t-xl h-[550px]' alt="" />
                </div>

                <div className='bg-gray-200 dark:bg-[#212121] dark:text-white rounded-b-xl p-6'>
                    <p className='first-letter:capitalize text-5xl text-red-700'>{details?.name}</p>

                    <p className='first-letter:capitalize my-2 text-xl'>{details?.sortDescription}</p>
                    <div className='lg:flex justify-between'>
                        <p className='font-semibold text-xl'>Total donation needed : <span className='font-medium text-xl'>{details?.maxDonationAmount} tk</span></p>
                        <p>Campaign created:{formatDate(details?.campaignCreatedTime)}</p>
                    </div>
                    <div className='lg:flex justify-between my-2'>
                        <p className='font-semibold text-xl'>Collected amount : <span className='text-xl font-medium'>{details?.totalDonation} tk</span> </p>
                        <p>Creator : {details?.campaignOwner}</p>
                    </div>
                    <ProgressBar completed={((details?.totalDonation / details?.maxDonationAmount) * 100).toFixed(2)} className='mt-2 mx-3 border-2 border-[#6a1b9a] rounded-full' maxCompleted={100} />
                    <p className='font-semibold text-xl mt-2'>Dontion's last date: <span className='font-medium text-xl'>{formatDate((details?.lastDateofDonation))}</span></p>

                    <div className='md:flex gap-2 font-semibold text-xl mt-2'><span>Description:</span> <p className='pl-2 md:pl-0 text-lg first-letter:capitalize font-normal'>ssss{details?.fullDesciption}</p></div>

                    <div className='mt-7'>
                        <Input size="lg" type="number" color="purple" label="Donation amount" required
                            className='text-3xl dark:text-white'
                            onChange={(e) => setDonateBalance((e.target.value) * 100)} />
                    </div>

                    <p className='text-red-900 mt-1 ml-3 '>{(maxDonationAmount == totalDonation) ? 'Donation completed...' : '' || baseError}</p>
                    <div className='mt-4'>
                        <Button fullWidth color="blue" ripple={true} className="py-3 rounded-lg font-medium" onClick={() => setModalIsOpen(true)}
                            disabled={baseError ? true : false || maxDonationAmount == totalDonation || donateBalance == undefined}>
                            Donate now</Button>
                    </div>
                </div>
            </div>


            <div>
                {/* <button onClick={openModal} className='bg-yellow-300'>Open Modal</button> */}
                <Modal isOpen={modalIsOpen} ariaHideApp={false} contentLabel="Donation Modal" overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
                    className="bg-white p-6 w-96 rounded-lg shadow-lg  mx-auto" >

                    <div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm donateBalance={donateBalance} id={id} setModalIsOpen={setModalIsOpen} refetch={refetch} details={details}>

                            </CheckoutForm>
                        </Elements>
                    </div>

                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setModalIsOpen(false)}>
                        closse</button>
                </Modal>
            </div>



        </div>
    );
};

export default CampaignDetails;