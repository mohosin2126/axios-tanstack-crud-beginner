import axios from "axios";

const axiosPublic=axios.create({
    baseURL:'https://y-gold-two.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;