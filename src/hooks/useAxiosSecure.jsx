import axios from "axios";

const header = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    return header
};

export default useAxiosSecure;
