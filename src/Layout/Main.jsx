import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../components/Footer";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="min-h-screen flex flex-col w-full">
            {noHeaderFooter || <Navbar />}
            <main className="flex-grow w-full pt-[60px]">
                <Outlet />
            </main>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default Main;