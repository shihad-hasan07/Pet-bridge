import axios from "axios";

const header = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return header
};

export default useAxiosPublic; 