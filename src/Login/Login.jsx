import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { useLanguage } from '../providers/LanguageProvider';
import SocialLogin from '../components/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { signIn } = useContext(AuthContext);
    const { translate } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        
        if (!termsAccepted) {
            Swal.fire({
                title: 'Terms & Conditions Required',
                text: 'Please accept the terms and conditions to continue',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            return;
        }

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                Swal.fire({
                    title: translate('successLogin'),
                    icon: 'success',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: translate('failedLogin'),
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: translate('tryAgain'),
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
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

    return (
        <div className="min-h-screen w-full bg-[#005482] flex fixed inset-0">
            {/* Left Section with Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#70C5D7] items-center justify-center p-12">
                <div className="max-w-lg">
                    <h2 className="text-4xl font-bold text-white mb-6">Yes! we're making progress</h2>
                    <p className="text-xl text-white/90">every minute & every second</p>
                    {/* You can add your illustration here */}
                    <div className="mt-8">
                        <img 
                            src="/path-to-your-illustration.svg" 
                            alt="Progress Illustration"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 overflow-y-auto">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo and Welcome Text */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#005482] mb-2">Welcome!</h1>
                        <p className="text-gray-600">It's really nice to see you</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    placeholder="Your email address *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    placeholder="Enter password *"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                                    required
                                />
                            </div>
                            
                            {/* Captcha Section */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                                <LoadCanvasTemplate />
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="captcha"
                                        id="captcha"
                                        placeholder="Enter captcha *"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleValidateCaptcha({ target: document.getElementById('captcha') })}
                                        className="px-6 py-3 bg-[#FCBB45] hover:bg-[#FCBB45]/90 text-white font-medium rounded-lg transition-all"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                className="w-4 h-4 border-gray-300 rounded text-[#DA3A60] focus:ring-[#DA3A60]"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I have read and agree to all{' '}
                                <Link to="/terms" className="text-[#70C5D7] hover:text-[#005482]" target="_blank">
                                    Terms & conditions
                                </Link>
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={disabled || !termsAccepted}
                            className="w-full py-3 px-6 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <span>Sign in</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Single Divider with OR */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 text-base">OR</span>
                            </div>
                        </div>

                        {/* Google Sign In Button */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-[#005482] font-medium"
                            onClick={() => {/* Your Google sign in handler */}}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                            </svg>
                            Sign in with Google
                        </button>

                        {/* Sign Up Link */}
                        <div className="flex items-center justify-between mt-6 text-sm">
                            <Link to="/signup" className="text-[#005482] hover:text-[#70C5D7] font-medium">
                                Sign up
                            </Link>
                            <Link to="/forgot-password" className="text-[#005482] hover:text-[#70C5D7]">
                                Lost password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
