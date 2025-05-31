// import React from "react";
// import { NavLink } from "react-router-dom";


// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 text-white py-6 mt-10">
//       <div className="container mx-auto text-center md:text-left px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Company Info */}
//           <div>
//             <h2 className="text-lg font-bold mb-2">LesonPaw</h2>
//             <p className="text-sm">
//               Organize your tasks efficiently and boost productivity with our seamless task management system.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h2 className="text-lg font-bold mb-2">Quick Links</h2>
//             <ul className="space-y-2">
//               <li>
//                 <NavLink to="/" className="hover:underline">
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/add" className="hover:underline">
//                   Add Task
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/login" className="hover:underline">
//                   Login
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h2 className="text-lg font-bold mb-2">Contact Us</h2>
//             <p>Email: rayhanahmed.nstu@gmail.com</p>
//             <p>Phone: +123 456 7890</p>
//             <p>Address: 123 Farmgate, Dhaka</p>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-300 mt-6 pt-4 text-sm text-gray-200 text-center">
//           &copy; {new Date().getFullYear()} LessonPaw. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="full-width-section" style={{ backgroundColor: "var(--color-text-dark)" }}>
      <div className="section-container py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="text-center sm:text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">LesonPaw</h2>
            <p className="text-sm md:text-base text-white">
              Organize your tasks efficiently and boost productivity with our seamless task management system.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-sm md:text-base text-white hover:text-[var(--color-hero)] transition-colors inline-block"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-sm md:text-base text-white hover:text-[var(--color-hero)] transition-colors inline-block"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/blog" 
                  className="text-sm md:text-base text-white hover:text-[var(--color-hero)] transition-colors inline-block"
                >
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Contact Us</h2>
            <div className="space-y-2 text-sm md:text-base text-white">
              <p className="flex items-center gap-2">
                <span>📧</span> rayhanahmed.nstu@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> +123 456 7890
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span> 123 Farmgate, Dhaka
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-4 text-sm text-center text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} LessonPaw. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[var(--color-hero)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--color-hero)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

