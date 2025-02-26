import { Input } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { allContext } from '../../authprovider/Authprovider';
import { toast } from 'react-toastify';
import { IoAlertCircleOutline } from 'react-icons/io5';
import useAxiosPublic from '../../hooks/useAxiosPublic';

import defaultProfileImg from '../../assets/defaultProfiepicture.png'


const Signup = () => {
    const { signup, updateprofile } = useContext(allContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const axioxPublic = useAxiosPublic()

    const onSubmit = (data) => {

        const { name, email, password, confirmPassword } = data;
        if (password.length < 6) {
            setError('Password must have atleast 6 character')
            return
        }
        if (password !== confirmPassword) {
            setError('Password not matched')
            return
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain atleaset 1 uppercase")
            return
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain atleaset 1 lowercase")
            return
        }
        setError('')

        signup(email, password)
            .then(res => {
                updateprofile(name, defaultProfileImg)
                    .then((response) => {
                        
                        const userInfo = {
                            name: res.user.displayName,
                            email: res.user.email,
                            image:defaultProfileImg,
                            role: 'user'
                        }
                        axioxPublic.post('/create-user', userInfo)
                            .catch(() => toast.error('Failed to add user in database'))

                        navigate(location?.state ? location.state : '/')
                        toast.success('signup succesfull')
                    })
            })
            .catch(err => toast.error('Sign up failed'))
    }

    return (
        <div className='bg-gray-100 dark:bg-black dark:text-white pb-36'>
            <p className="text-5xl text-center py-10">Sign up</p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-5 mx-auto rounded-xl ">
                <div>
                    <Input {...register("name")} size="lg" type="text" color="purple" label="Name" required />
                </div>

                <div className='mt-5'>
                    <Input {...register("email")} size="lg" type="email" color="purple" label="Email" required />
                </div>

                <div className="mt-5">
                    <Input {...register("password")} size="lg" type="password" color="purple" label="Password" required />
                </div>

                <div className="mt-5">
                    <Input {...register("confirmPassword")} size="lg" type="password" color="purple" label="Confirm Password" required />
                    {
                        error && <p className='flex items-center gap-1 mt-2 text-red-800 text-sm'><IoAlertCircleOutline size={19} /><span>{error}</span></p>
                    }
                </div>

                <div>
                    <button type='submit' className="btttn w-full mt-5">Sign up</button>
                </div>

                <div className="flex items-center px-3 w-full mt-5 max-w-md">
                    <div className="flex-grow border-t-2 border-gray-400 rounded-3xl"></div>
                    <span className="mx-4 text-center text-red-600 whitespace-nowrap">Already have an account.</span>
                    <div className="flex-grow border-t-2 border-gray-400 rounded-3xl"></div>
                </div>
                <div>
                    <Link to='/login'>
                        <p className="cursor-pointer w-full justify-center flex items-center gap-1 mt-5 text-xl  py-[9px] rounded-xl border border-blue-700">
                            Login</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;