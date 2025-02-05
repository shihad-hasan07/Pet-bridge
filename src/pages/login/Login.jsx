import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io5";
import loginbgLottie from '../../assets/lottie/bg.json'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { allContext } from "../../authprovider/Authprovider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const axioxPublic = useAxiosPublic()
    const { googleLogin, githubLogin, login } = useContext(allContext)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const location = useLocation()

    const onSubmit = (data) => {
        login(data?.email, data?.password)
            .then(res => {
                toast.success('Succesfull login')
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => toast.error('Something wrong happen'))
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {

                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'user'
                }
                axioxPublic.post('/create-user', userInfo)
                    .catch(() => toast.error('Failed to add user in database'))

                toast.success('Succesfully login')
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                toast.error('Login failed')
            })
    }
    const handleGithubLogin = () => {
        githubLogin()
            .then(res => {

                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'user'
                }
                axioxPublic.post('/create-user', userInfo)
                    .catch(() => toast.error('Failed to add user in database'))

                toast.success('Succesfully login')
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                if (error.code === "auth/account-exists-with-different-credential") {
                    toast.error('User already exists')
                } else {
                    toast.error('Login failed')
                }
            })
    }
    return (
        <div className="relative z-10 bg-gray-100 dark:bg-black dark:text-white pb-36">

            <div className="absolute inset-0 -z-10 opacity-25">
                <Lottie animationData={loginbgLottie} className="w-full h-full opacity-75" />
            </div>

            <p className="text-5xl text-center py-10">Login</p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-5 mx-auto rounded-xl ">

                <div>
                    <Input {...register("email")} size="lg" type="email" color="purple" label="Email" required />
                </div>

                <div className="mt-5">
                    <Input {...register("password")} size="lg" type="password" color="purple" label="Password" required />
                </div>

                <div>
                    <button type="submit" className="btttn w-full mt-5">Login</button>
                </div>

                <div className="flex justify-between gap-3 mt-5">
                    <p onClick={handleGoogleLogin} className="cursor-pointer w-full justify-center flex items-center gap-1 text-2xl  py-[9px] rounded-xl border border-blue-700">
                        <FcGoogle />Google</p>
                    <p onClick={handleGithubLogin} className="cursor-pointer w-full justify-center flex items-center gap-1 text-2xl  py-[9px] rounded-xl border border-blue-700">
                        <IoLogoGithub />Github</p>
                </div>

                {/* divider */}
                <div className="flex items-center px-3 w-full mt-5 max-w-md">
                    <div className="flex-grow border-t-2 border-gray-400 rounded-3xl"></div><span className="mx-4 text-center text-red-600 whitespace-nowrap">Don't have and account?</span><div className="flex-grow border-t-2 border-gray-400 rounded-3xl"></div>
                </div>

                <div>
                    <Link to='/signup'>
                        <p className="cursor-pointer w-full justify-center flex items-center gap-1 mt-5 text-xl  py-[9px] rounded-xl border border-blue-700">
                            Create an account</p>
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default Login;