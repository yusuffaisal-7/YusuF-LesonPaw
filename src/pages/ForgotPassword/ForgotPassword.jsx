import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await resetPassword(email);
            Swal.fire({
                icon: 'success',
                title: 'Password Reset Email Sent',
                text: 'Please check your email for instructions to reset your password.',
                confirmButtonText: 'OK'
            });
            setEmail('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to send password reset email. Please try again.',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#005482] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#005482] mb-2">Reset Password</h1>
                    <p className="text-gray-600">Enter your email to receive password reset instructions</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#70C5D7] text-[#005482]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !email}
                        className="w-full py-3 px-6 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Sending...</span>
                            </>
                        ) : (
                            <span>Send Reset Link</span>
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-[#005482] hover:text-[#70C5D7] text-sm">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword; 