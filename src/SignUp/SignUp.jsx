import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "../components/SocialLogin";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import bgImage from "../assets/Video.webm";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const SignUp = () => {
    const [disabled, setDisabled] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleValidateCaptcha = (element) => {
        const captchaValue = element.value;
        if (validateCaptcha(captchaValue)) {
            setDisabled(false);
            Swal.fire({
                icon: 'success',
                title: 'Captcha Validated!',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            setDisabled(true);
            Swal.fire({
                icon: 'error',
                title: 'Invalid Captcha',
                text: 'Please try again',
                confirmButtonText: 'Ok'
            });
        }
    };

    const handleImageUpload = async (photo) => {
        const formData = new FormData();
        formData.append('image', photo);

        try {
            const response = await fetch(image_hosting_api, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            return data.data.url;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    const onSubmit = async (data) => {
        let photoURL = data.photoURL;
        if (data.photo && data.photo[0]) {
            photoURL = await handleImageUpload(data.photo[0]);
            if (!photoURL) {
                Swal.fire({
                    icon: 'error',
                    title: 'Image Upload Failed',
                    text: 'Please try again or use a photo URL instead.'
                });
                return;
            }
        }

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log("User Created:", loggedUser);

                updateUserProfile(data.name, photoURL)
                    .then(() => {
                        console.log("User profile info updated");
                        const userInfo = {
                            uid: loggedUser.uid,
                            name: data.name,
                            email: data.email,
                            photoURL: photoURL
                        };

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("User added to the database");
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => console.log("Database Error:", error));
                    })
                    .catch(error => console.log("Profile Update Error:", error));
            })
            .catch(error => console.log("Create User Error:", error));
    };

    return (
        <div className="h-screen w-screen overflow-hidden absolute top-0 left-0 flex items-center justify-center">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={bgImage}
            />

            {/* Overlay and Decorative Elements */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

            {/* Main Container */}
            <div className="relative w-full max-w-4xl mx-4 flex flex-col md:flex-row backdrop-blur-md bg-gradient-to-br from-blue-800/50 to-teal-700/50 border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                {/* Left Section - Welcome Message */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-b from-teal-600/30 to-transparent">
                    <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200 drop-shadow-lg">
                        Create Account
                    </h2>
                    <p className="text-center text-white/70 mt-4">
                        Join LesonPaw and start your learning journey today
                    </p>
                </div>

                {/* Right Section - Sign Up Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-white/10 backdrop-blur-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="text-sm font-medium text-white/90 mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                            />
                            {errors.name && (
                                <span className="text-red-400 text-sm mt-1">{errors.name.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-medium text-white/90 mb-2">Profile Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo")}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-400/20 file:text-teal-200 hover:file:bg-teal-400/30"
                            />
                            <input
                                type="text"
                                placeholder="Or enter photo URL"
                                {...register("photoURL")}
                                className="w-full px-4 py-3 mt-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                            />
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-medium text-white/90 mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                            />
                            {errors.email && (
                                <span className="text-red-400 text-sm mt-1">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-medium text-white/90 mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        message: "Password must include uppercase, lowercase, number and special character"
                                    }
                                })}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                            />
                            {errors.password && (
                                <span className="text-red-400 text-sm mt-1">{errors.password.message}</span>
                            )}
                        </div>

                        <div className="form-control space-y-3">
                            <label className="text-sm font-medium text-white/90 mb-2">Verify Captcha</label>
                            <label className="block">
                                <LoadCanvasTemplate />
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="captcha"
                                    id="signupCaptcha"
                                    placeholder="Enter the captcha text"
                                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleValidateCaptcha(document.getElementById('signupCaptcha'))}
                                    className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                                >
                                    Validate
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={disabled}
                            className="w-full py-3 px-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Social Login Section */}
                    <div className="mt-6">
                        <SocialLogin />
                    </div>

                    {/* Login Link */}
                    <p className="text-center mt-8 text-white/70">
                        Already have an account?{' '}
                        <Link to="/login" className="text-teal-300 hover:text-teal-200 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
