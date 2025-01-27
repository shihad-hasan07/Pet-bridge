import axios from "axios";

const axiosss = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosss
};

export default useAxiosPublic; 