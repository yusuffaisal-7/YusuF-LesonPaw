import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useLanguage } from '../providers/LanguageProvider';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { translate } = useLanguage();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Send message using the secure axios instance
            await axiosSecure.post('/send-message', {
                message: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Subject: ${data.subject}

Message:
${data.message}`,
                email: user?.email || data.email
            });
            
            Swal.fire({
                icon: 'success',
                title: translate('messageSent'),
                text: translate('responseTime')
            });
            reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: translate('submissionFailed'),
                text: error.response?.data?.message || translate('tryAlternativeContact')
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#005482] to-[#70C5D7] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {translate('getInTouch')} <span className="text-[#FCBB45]">LessonPaw</span>
                    </h1>
                    <p className="text-base md:text-lg text-white/90">
                        {translate('We\'re here to help! Send us a message and we\'ll respond within 24 business hours.')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                    {/* Left Column - Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-lg shadow-xl h-full">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-[#005482] mb-4">{translate('sendMessage')}</h2>
                                {user ? (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Name Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {translate('fullName')} *
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("name", { required: translate('nameRequired') })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7]"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                                )}
                                            </div>

                                            {/* Email Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {translate('email')} *
                                                </label>
                                                <input
                                                    type="email"
                                                    defaultValue={user?.email}
                                                    readOnly
                                                    {...register("email")}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Phone Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {translate('phone')} ({translate('optional')})
                                                </label>
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7]"
                                                />
                                            </div>

                                            {/* Subject Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    {translate('subject')} *
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("subject", { required: translate('subjectRequired') })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7]"
                                                />
                                                {errors.subject && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Message Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {translate('message')} *
                                            </label>
                                            <textarea
                                                {...register("message", {
                                                    required: translate('messageRequired'),
                                                    minLength: {
                                                        value: 20,
                                                        message: translate('messageMinLength')
                                                    }
                                                })}
                                                rows={5}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7]"
                                            ></textarea>
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                            )}
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {translate('attachments')} ({translate('optional')})
                                            </label>
                                            <input
                                                type="file"
                                                {...register("attachments")}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7]"
                                                multiple
                                            />
                                            <p className="mt-1 text-sm text-gray-500">
                                                {translate('fileUploadInfo')}
                                            </p>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? translate('sending') : translate('sendMessage')}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[400px]">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-3">{translate('signInToMessage')}</h4>
                                        <p className="text-gray-600 mb-6 max-w-md text-center">{translate('pleaseLoginMessage')}</p>
                                        <Link
                                            to="/login"
                                            className="inline-block bg-[#DA3A60] text-white py-3 px-8 rounded-lg text-center font-semibold hover:bg-[#DA3A60]/90 transition-all"
                                        >
                                            {translate('login')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Information Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Business Hours Card */}
                        <div className="bg-white rounded-lg shadow-xl">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-[#005482] mb-4">{translate('businessHours')}</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">{translate('mondayFriday')}</span>
                                        <span className="text-gray-900 font-medium text-sm">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">{translate('saturday')}</span>
                                        <span className="text-gray-900 font-medium text-sm">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">{translate('sunday')}</span>
                                        <span className="text-gray-900 font-medium text-sm">{translate('closed')}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                                        {translate('All times are in Eastern Time (ET)')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Card */}
                        <div className="bg-white rounded-lg shadow-xl">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-[#005482] mb-4">{translate('contactInfo')}</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Email</p>
                                            <a href="mailto:support@lessonpaw.com" className="text-sm text-[#005482] hover:text-[#70C5D7] transition-colors">
                                                support@lessonpaw.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Phone</p>
                                            <a href="tel:(123) 456-7890" className="text-sm text-[#005482] hover:text-[#70C5D7] transition-colors">
                                                (123) 456-7890
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Address</p>
                                            <p className="text-sm text-[#005482]">
                                                45 Boulevard Jean-Jacques Dessalines<br />
                                                Turgeau<br />
                                                Port-au-Prince, Haiti
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connect With Us Card */}
                        <div className="bg-white rounded-lg shadow-xl">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-[#005482] mb-4">{translate('connectWithUs')}</h2>
                                <div className="flex justify-center space-x-6">
                                    <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                                        <span className="sr-only">Facebook</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                                        <span className="sr-only">Instagram</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps Integration */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-[#005482] mb-4">{translate('ourLocation')}</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241560.69981959182!2d-72.4417258086061!3d18.547760567250473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb9e7963a3649b1%3A0x3378c4f908dc5d06!2sPort-au-Prince%2C%20Haiti!5e0!3m2!1sen!2s!4v1647043376559!5m2!1sen!2s"
                                className="w-full h-[400px] rounded-lg"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <a
                                href="https://www.google.com/maps/dir//Port-au-Prince,+Haiti/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[#005482] hover:text-[#70C5D7] transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {translate('getDirections')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 