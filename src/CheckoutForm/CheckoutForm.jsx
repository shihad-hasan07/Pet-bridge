import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { allContext } from "../authprovider/Authprovider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CheckoutForm = ({ donateBalance, id, refetch, setModalIsOpen, details }) => {

    const stripe = useStripe()
    const elements = useElements()
    const { user } = useContext(allContext)
    const axiosSecure = useAxiosSecure()
    const [Error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setloading] = useState(false)


    // this is for stripe related 
    useEffect(() => {
        if (donateBalance < 50 || isNaN(donateBalance) || donateBalance > 999999.99) {
            setClientSecret('')
            return
        }
        axiosSecure.post(`/create-payment-intent`, { balance: donateBalance })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
            .catch(error => console.log(error))
    }, [donateBalance, axiosSecure])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)

        if (!stripe || !elements) {
            setloading(false)
            return;
        }

        const card = elements.getElement(CardElement)
        if (!card) {
            setloading(false)
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('Payment Error', error);
            setError(error?.message)
            setloading(false)
        }
        else {
            console.log('pament method', paymentMethod);
            setError('')
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        })


        if (paymentIntent) {
            console.log('final payment intedt', paymentIntent);
            if (paymentIntent.status === 'succeeded') {

                const finalDonatedBalance = paymentIntent.amount
                axiosSecure.patch(`/donate-in-campaign/${id}`, { finalDonatedBalance: finalDonatedBalance })
                    .then(res => {
                        const donationHistory = {
                            transactionId: paymentIntent.id,
                            petName: details?.name,
                            petImage: details?.image,
                            donatorDetails: {
                                name: user?.displayName,
                                email: user?.email,
                                image: user?.photoURL,
                                donationAmount: paymentIntent?.amount / 100,
                                donationTime: new Date().toISOString()
                            },
                            donationRequestorInfo: {
                                campaignID: details._id,
                                name: details?.campaignOwner
                            }
                        }
                        axiosSecure.post('/donation-history', donationHistory)
                            .then(ress => {
                                if (ress?.data?.acknowledged == true) {
                                    toast.success('Donation succesfull')
                                    setModalIsOpen(false)
                                    refetch()
                                }
                            })
                            .catch(err => {
                                toast.error('Something wrong happened..')
                                console.log(err);
                            })
                    })
                    .catch(error => {
                        toast.error('something wrong happened.')
                        console.log('error of adding in database', error);
                    })
            }
        }
        else {
            console.log('stripe error', confirmError)
            setError(confirmError?.decline_code)

        }
        setloading(false)
    }


    return (
        <form onSubmit={handleSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className="text-red-900 mt-2 first-letter:uppercase ml-2">{Error ? Error : ''}</p>
            {
                !loading
                    ? <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-100 "
                        // disabled={!stripe || !clientSecret}>
                        disabled={!stripe}>
                        Pay
                    </button>
                    : <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-100 ">
                        Processing...
                    </button>}
        </form>
    );
};

export default CheckoutForm;