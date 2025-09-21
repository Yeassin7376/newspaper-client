import axios from 'axios';


const axiosInstance = axios.create({
    baseURL : 'https://newspaper-server-beta.vercel.app'
    // baseURL : 'http://localhost:5000'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;