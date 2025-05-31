import axios from "axios";

const axiosPublic =axios.create({
    // baseURL: 'http://localhost:5000'
    // baseURL: 'https://lesson-paw-server-ms63iv0cf-rayhan557s-projects.vercel.app'
     baseURL: "https://lesson-paw-server.vercel.app", 
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
