import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { allContext } from "../authprovider/Authprovider";

const header = axios.create({
    // baseURL: 'http://localhost:5000'
    baseURL: 'https://pet-bridge-server.vercel.app'
})

const useAxiosSecure = () => {
    const { logOut } = useContext(allContext)
    const navigate = useNavigate()

    header.interceptors.request.use(function (config) {

        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    header.interceptors.response.use(function (response) {
        return response
    }, async function (error) {

        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error)
    })

    return header
};

export default useAxiosSecure;
