import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import { useLanguage } from '../providers/LanguageProvider';
import SocialLogin from '../components/SocialLogin';
import bgImage from "../assets/Video.webm";

const Login = () => {
    const [disabled, setDisabled] = useState(true);
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
                        {translate('welcomeBack')}
                    </h2>
                    <p className="text-center text-white/70 mt-4">
                        {translate('continueJourney')}
                    </p>
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-white/10 backdrop-blur-lg">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="form-control">
                            <label className="text-sm font-medium text-white/90 mb-2">{translate('email')}</label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder={translate('enterEmail')}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="text-sm font-medium text-white/90 mb-2">{translate('password')}</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                placeholder={translate('enterPassword')}
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <Link className="text-sm text-teal-300 hover:text-teal-200 transition-colors">
                                    {translate('forgotPassword')}
                                </Link>
                            </div>
                        </div>

                        <div className="form-control space-y-3">
                            <label className="block">
                                <LoadCanvasTemplate />
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="captcha"
                                    id="captcha"
                                    placeholder={translate('captchaText')}
                                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleValidateCaptcha({ target: document.getElementById('captcha') })}
                                    className="px-6 py-3 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                                >
                                    {translate('validate')}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={disabled}
                            className="w-full py-3 px-6 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {translate('login')}
                        </button>
                    </form>

                    {/* Social Login Section */}
                    <div className="mt-6">
                        <SocialLogin />
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center mt-8 text-white/70">
                        {translate('newToSite')}{' '}
                        <Link to="/signup" className="text-teal-300 hover:text-teal-200 font-medium transition-colors">
                            {translate('createAccount')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
