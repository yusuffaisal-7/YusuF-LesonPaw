// import React from 'react';
// import img2 from "../../../assets/img-02.png";

// const Banner = () => {
//     return (
//         <div className="w-full bg-gradient-to-r from-blue-800 to-teal-700 text-white py-16 px-4">
//             <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
//                 <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
//                     <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
//                     <p className="text-lg mb-6">Discover amazing features and join our community today!</p>
//                     <button className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full">
//                         Get Started
//                     </button>
//                 </div>
//                 <div className="md:w-1/2 flex justify-center">
//                     <img src={img2} alt="Banner Illustration" className="w-full max-w-sm h-auto" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLanguage } from '../../../providers/LanguageProvider';
import img2 from "../../../assets/img-02.png";

const Banner = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const texts = ['Equitable society', 'Self confidence'];
  const typingSpeed = 150; // Speed for typing
  const deletingSpeed = 100; // Speed for deleting
  const delayBetweenWords = 1000; // Delay after word is typed

  useEffect(() => {
    let timeout;

    const animateText = () => {
      const currentText = texts[currentIndex];
      
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeout = setTimeout(animateText, typingSpeed);
        } else {
          // Finished typing, wait before deleting
          timeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeout = setTimeout(animateText, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeout = setTimeout(animateText, 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  const handleJoinClick = () => {
    if (!user) {
      navigate('/login');
    }
  };

  return (
    <div className="w-full bg-white py-16 min-h-[calc(100vh-60px)]">
      <div className="w-full px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              {translate('transformingEducation')} <span className="text-blue-500">{translate('inHaiti')}</span>
            </h1>
            <div>
              <span className="inline-block bg-[#DA3A60] text-white px-10 py-5 text-5xl md:text-6xl font-semibold rounded-2xl">
                {displayText}
                <span className="typing-cursor"></span>
              </span>
            </div>
            <p className="text-xl text-gray-700 max-w-2xl">
              {translate('buildingBridges')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <button 
                onClick={handleJoinClick}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-semibold py-5 px-10 rounded-full hover:from-orange-600 hover:to-red-600 transition-all"
              >
                {translate('getStarted')}
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src={img2} alt="Banner Illustration" className="w-full h-auto" />
          </div>
        </div>
        
        <p className="mt-12 text-gray-500 text-lg flex items-center justify-center gap-3">
          <span className="text-3xl">🛡️</span> {translate('connectingStudents')}
        </p>
      </div>
    </div>
  );
};

export default Banner;