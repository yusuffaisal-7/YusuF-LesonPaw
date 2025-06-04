import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/UseAxiosPublic';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    const createUser = async (email, password) => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Send verification email
        await sendEmailVerification(userCredential.user);
        return userCredential;
    };
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
  
    const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
};

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
        });
    };

    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    };

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
           
    //         setLoading(false);
    //     });

    //     return () => unsubscribe();
    // }, []);
   
   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser);
            if(currentUser){
        //  assign token 
        const userInfo = {email: currentUser.email};
        axiosPublic.post('/jwt', userInfo )
        .then(res =>{
            if(res.data.token){
                localStorage.setItem('access-token', res.data.token);
            }
        })

            }else{
                // do somethig when user doesnot exist
                // todo remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [axiosPublic]);


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
        resetPassword, 
        verifyEmail,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;