import React from 'react';

const Intro = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
                <p className="text-gray-600">
                    Welcome to your dashboard! 
                </p>
            </div>
        </div>
    );
};

export default Intro;
