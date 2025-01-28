import axios from "axios";

const header = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://pet-bridge-server.vercel.app'
})

const useAxiosSecure = () => {
    return header
};

export default useAxiosSecure;
