import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import Loading from '../components/Loading/Loading';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const noHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        // Show loading when route changes
        setIsLoading(true);

        // Hide loading after a minimum delay to prevent flickering
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300); // Reduced to 300ms (0.3 seconds)

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col w-full">
            {isLoading && <Loading />}
            {noHeaderFooter || <Navbar />}
            <main className="flex-grow w-full pt-[60px]">
                <Outlet />
            </main>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;