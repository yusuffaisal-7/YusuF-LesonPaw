import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';

const useTeacher = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/${user.email}`);
            return res.data?.teacher;
        }

      
    });

    return [isTeacher, isTeacherLoading];
};

export default useTeacher;


// import useAxiosSecure from './useAxiosSecure';
// import { AuthContext } from '../providers/AuthProvider';
// import { useContext } from 'react';

// const useTeacher = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();
//     const {data: isAdmin, isPending: isAdminLoading} = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async () =>{
//             const res = await axiosSecure.get(`/users/admin/${user.email}`);
           
//             return res.data?.admin;
//         }
//     })
//     return [isAdmin, isAdminLoading]
// };

// export default useTeacher;
