import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="login-BG h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-60 mx-auto">
                <Input  {...register("email")} type="email" className="" color="purple" label="Email" />

                <div className="w-72 mt-10">
                    <Input type="email" color="black" label="Email Address" />
                </div>
            </form>
        </div>
    );
};

export default Login;