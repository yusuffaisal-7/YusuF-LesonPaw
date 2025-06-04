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

                        {/* Google Sign In */}
                        <SocialLogin />

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
