import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useGetData = () => {
    const axiosPublic=useAxiosPublic()
    const {user}=useContext(AuthContext)
        // tanstack query 
        const {refetch,data:booking=[]}=useQuery({
    queryKey:["booking",user?.email],
    queryFn:async ()=>{
        const res=await axiosPublic.get(`/bookings?email=${user.email}`)
        return res.data
    }
        })
    return [booking,refetch]
    };

export default useGetData;