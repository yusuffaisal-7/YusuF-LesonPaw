import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";


const useCart = () => {
    const axioSecure = useAxiosSecure();
   const { user } = useContext(AuthContext);

    const { refetch, data: cart=[]} = useQuery({
       queryKey: ['cart' ,user?.email], 
       queryFn: async () =>{
        const res = await axioSecure.get(`/carts?email=${user.email}`)
        return res.data;
       }
    })
    return [cart, refetch]
};

export default useCart;