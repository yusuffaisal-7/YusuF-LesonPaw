// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const TeacherHome = () => {
//   const { user, loading } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     if (!loading && user?.email) {
//       axiosSecure
//         .get(`/users/profile/${encodeURIComponent(user.email)}`)
//         .then((res) => {
//           setProfile(res.data);
//         })
//         .catch((error) => {
//           console.error("Failed to fetch profile:", error);
//         });
//     }
//   }, [user, loading]);

//   if (loading || !profile) {
//     return <div className="text-center mt-10 text-lg font-medium">Loading profile...</div>;
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
//       <div className="flex flex-col md:flex-row items-center gap-6">
//         <img
//           src={profile.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
//           alt="Profile"
//           className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-md"
//         />
//         <div className="text-center md:text-left space-y-2">
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//             Welcome, {profile.name || "Teacher"}
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> {profile.email}</p>
//           <p className="text-gray-600 dark:text-gray-300"><strong>Role:</strong> {profile.role}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherHome;





// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const TeacherHome = () => {
//   const { user, loading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!loading && user?.email) {
//       axiosSecure.get('/tutors')
//         .then(res => {
//           const matchedTutor = res.data.find(tutor => tutor.email === user.email);
//           setProfile(matchedTutor || null);
//           setIsLoading(false);
//         })
//         .catch(err => {
//           console.error("Error fetching tutors:", err);
//           setIsLoading(false);
//         });
//     }
//   }, [loading, user, axiosSecure]);

//   if (loading || isLoading) {
//     return <div className="text-center mt-10 text-lg">Loading profile...</div>;
//   }

//   if (!profile) {
//     return <div className="text-center mt-10 text-red-600">No tutor profile found for {user.email}</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
//       <div className="flex flex-col md:flex-row items-start gap-6">
//         <img
//           src={profile.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
//           alt="Profile"
//           className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow-md"
//         />
//         <div className="space-y-2 text-gray-700 dark:text-gray-200 w-full">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
//           <p><strong>Gender:</strong> {profile.gender}</p>
//           <p><strong>Phone:</strong> {profile.contactNumber}</p>
//           <p><strong>Institution:</strong> {profile.institution}</p>
//           <p><strong>Subjects:</strong> {profile.subjects?.join(", ")}</p>
//           <p><strong>Qualifications:</strong> {profile.educationalQualifications}</p>
//           <p><strong>Experience:</strong> {profile.experience} years</p>
//           <p><strong>Certifications:</strong> {profile.certifications?.join(", ")}</p>
//           <p><strong>Teaching Mode:</strong> {profile.teachingMode}</p>
//           <p><strong>Availability:</strong> {profile.availability?.join(", ")}</p>
//           <p><strong>Hourly Rate:</strong> ${profile.hourlyRate}</p>
//           <p><strong>Bio:</strong> {profile.bio}</p>
//           <p><strong>Status:</strong> <span className="text-green-500 font-semibold">{profile.status}</span></p>

//           <div className="mt-4">
//             <h3 className="font-semibold text-lg">Address</h3>
//             <p><strong>City:</strong> {profile.address?.city}</p>
//             <p><strong>State:</strong> {profile.address?.state}</p>
//             <p><strong>Country:</strong> {profile.address?.country}</p>
//             <p><strong>Postal Code:</strong> {profile.address?.postalCode}</p>
//             <p><strong>Permanent Address:</strong> {profile.address?.permanentAddress}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherHome;


// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const TeacherHome = () => {
//   const { user, loading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!loading && user?.email) {
//       axiosSecure.get('/tutors')
//         .then(res => {
//           const matchedTutor = res.data.find(tutor => tutor.email === user.email);
//           setProfile(matchedTutor || null);
//           setIsLoading(false);
//         })
//         .catch(err => {
//           console.error("Error fetching tutors:", err);
//           setIsLoading(false);
//         });
//     }
//   }, [loading, user, axiosSecure]);

//   useEffect(() => {
//     if (profile) {
//       const sections = document.querySelectorAll('.section');
//       const animateSections = () => {
//         sections.forEach((section, index) => {
//           setTimeout(() => {
//             section.classList.add('visible');
//           }, index * 150);
//         });
//       };

//       animateSections();
//       window.addEventListener('scroll', animateSections);

//       return () => {
//         window.removeEventListener('scroll', animateSections);
//       };
//     }
//   }, [profile]);

//   if (loading || isLoading) {
//     return <div className="text-center mt-10 text-lg text-gray-900">Loading profile...</div>;
//   }

//   if (!profile) {
//     return <div className="text-center mt-10 text-red-600">No tutor profile found for {user.email}</div>;
//   }

//   const handleCardEnter = (e) => {
//     e.currentTarget.style.transform = 'translateY(-5px)';
//     e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
//   };

//   const handleCardLeave = (e) => {
//     e.currentTarget.style.transform = 'translateY(0)';
//     e.currentTarget.style.boxShadow = 'none';
//   };

//   const textColor = "text-gray-900"; // stronger dark text color for visibility

//   return (
//     <div className="font-['Montserrat']" style={{
//       background: "linear-gradient(135deg, #f6f8fd 0%, #e9ecf5 100%)",
//       minHeight: "100vh",
//       padding: "40px 20px",
//       lineHeight: "1.6"
//     }}>
//       <div className="max-w-[900px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//         <div className="flex items-center gap-6 p-8 text-white" style={{
//           background: "linear-gradient(to right, #4361ee, #3f37c9)"
//         }}>
//           <div className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-lg overflow-hidden relative animate-pulse">
//             <img
//               src={profile.photoURL || "/api/placeholder/400/400"}
//               alt="Profile"
//               className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//             />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
//             <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm inline-block">
//               Professional Educator
//             </div>
//           </div>
//         </div>

//         {/* Section Template */}
//         {[
//           {
//             title: "Personal Information",
//             icon: "👤",
//             data: [
//               { label: 'Email', value: profile.email },
//               { label: 'Date of Birth', value: profile.dateOfBirth },
//               { label: 'Gender', value: profile.gender },
//               { label: 'Phone', value: profile.contactNumber },
//             ],
//           },
//           {
//             title: "Professional Summary",
//             icon: "🎓",
//             data: [
//               { label: 'Institution', value: profile.institution },
//               { label: 'Subjects', value: profile.subjects?.join(", ") },
//               { label: 'Qualifications', value: profile.educationalQualifications },
//               { label: 'Experience', value: `${profile.experience} years` },
//               { label: 'Certifications', value: profile.certifications?.join(", ") },
//               { label: 'Teaching Mode', value: profile.teachingMode },
//             ],
//           },
//           {
//             title: "Availability & Rates",
//             icon: "🕒",
//             data: [
//               { label: 'Weekdays', value: profile.availability?.join(", ") },
//               { label: 'Hourly Rate', value: `$${profile.hourlyRate}` },
//               { label: 'Preferred Time', value: profile.preferredTime },
//               { label: 'Location', value: profile.location },
//             ],
//           },
//         ].map((section, idx) => (
//           <div key={idx} className="section mb-8 opacity-0 transform translate-y-5 transition-all duration-500">
//             <div className="flex items-center mb-5 pb-2 border-b-2 border-gray-100">
//               <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-[#4361ee] text-lg">
//                 {section.icon}
//               </div>
//               <h2 className="text-xl font-semibold text-[#4361ee]">{section.title}</h2>
//             </div>
//             <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}>
//               {section.data.map((item, i) => (
//                 <div
//                   key={i}
//                   className={`bg-gray-100 p-4 rounded-xl transition-all duration-300 hover:bg-gray-200 ${textColor}`}
//                   onMouseEnter={handleCardEnter}
//                   onMouseLeave={handleCardLeave}
//                 >
//                   <div className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-1">
//                     {item.label}
//                   </div>
//                   <div className="font-medium">{item.value || '-'}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeacherHome;

// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const TeacherHome = () => {
//   const { user, loading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!loading && user?.email) {
//       axiosSecure
//         .get("/tutors")
//         .then((res) => {
//           const matchedTutor = res.data.find(
//             (tutor) => tutor.email === user.email
//           );
//           setProfile(matchedTutor || null);
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching tutors:", err);
//           setIsLoading(false);
//         });
//     }
//   }, [loading, user, axiosSecure]);

//   useEffect(() => {
//     if (profile) {
//       const sections = document.querySelectorAll(".section");
//       const animateSections = () => {
//         sections.forEach((section, index) => {
//           setTimeout(() => {
//             section.classList.add("visible");
//           }, index * 150);
//         });
//       };

//       animateSections();
//       window.addEventListener("scroll", animateSections);

//       return () => {
//         window.removeEventListener("scroll", animateSections);
//       };
//     }
//   }, [profile]);

//   if (loading || isLoading) {
//     return (
//       <div className="text-center mt-10 text-lg text-gray-900 dark:text-gray-100">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="text-center mt-10 text-red-600 dark:text-red-400">
//         No tutor profile found for {user.email}
//       </div>
//     );
//   }

//   const handleCardEnter = (e) => {
//     e.currentTarget.style.transform = "translateY(-5px)";
//     e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
//   };

//   const handleCardLeave = (e) => {
//     e.currentTarget.style.transform = "translateY(0)";
//     e.currentTarget.style.boxShadow = "none";
//   };

//   const textColor = "text-gray-900 dark:text-gray-100";

//   return (
//     <div
//       className="font-['Montserrat'] px-4 py-10 md:px-8 md:py-14"
//       style={{
//         background: "linear-gradient(135deg, #f6f8fd 0%, #e9ecf5 100%)",
//         minHeight: "100vh",
//       }}
//     >
//       <div className="max-w-[900px] mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
//         {/* Header */}
//         <div
//           className="flex items-center gap-6 px-6 py-8 text-white"
//           style={{
//             background: "linear-gradient(to right, #4361ee, #3f37c9)",
//           }}
//         >
//           <div className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-lg overflow-hidden relative animate-pulse">
//             <img
//               src={profile.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
//               alt={`${profile.name} profile photo`}
//               className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//             />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
//             <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm inline-block">
//               Professional Educator
//             </div>
//           </div>
//         </div>

//         {/* Profile Sections */}
//         <div className="px-6 py-8">
//           {[
//             {
//               title: "Personal Information",
//               icon: "👤",
//               data: [
//                 { label: "Email", value: profile.email },
//                 { label: "Date of Birth", value: profile.dateOfBirth },
//                 { label: "Gender", value: profile.gender },
//                 { label: "Phone", value: profile.contactNumber },
//               ],
//             },
//             {
//               title: "Professional Summary",
//               icon: "🎓",
//               data: [
//                 { label: "Institution", value: profile.institution },
//                 { label: "Subjects", value: profile.subjects?.join(", ") },
//                 { label: "Qualifications", value: profile.educationalQualifications },
//                 { label: "Experience", value: `${profile.experience} years` },
//                 { label: "Certifications", value: profile.certifications?.join(", ") },
//                 { label: "Teaching Mode", value: profile.teachingMode },
//               ],
//             },
//             {
//               title: "Availability & Rates",
//               icon: "🕒",
//               data: [
//                 { label: "Availability", value: profile.availability?.join(", ") },
//                 { label: "Hourly Rate", value: `$${profile.hourlyRate}` },
//                 { label: "Preferred Time", value: profile.preferredTime },
//                 { label: "Location", value: profile.location },
//               ],
//             },
//           ].map((section, idx) => (
//             <div
//               key={idx}
//               className="section mb-10 opacity-0 transform translate-y-5 transition-all duration-500"
//             >
//               <div className="flex items-center mb-4 pb-2 border-b-2 border-gray-100 dark:border-gray-700">
//                 <div className="bg-gray-100 dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-[#4361ee] text-lg">
//                   {section.icon}
//                 </div>
//                 <h2 className="text-xl font-semibold text-[#4361ee]">{section.title}</h2>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {section.data.map((item, i) => (
//                   <div
//                     key={i}
//                     className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${textColor}`}
//                     onMouseEnter={handleCardEnter}
//                     onMouseLeave={handleCardLeave}
//                   >
//                     <div className="text-xs font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider mb-1">
//                       {item.label}
//                     </div>
//                     <div className="font-medium">{item.value || "-"}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         .section.visible {
//           opacity: 1 !important;
//           transform: translateY(0) !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TeacherHome;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBook, FaClock, FaMapMarkerAlt, FaDollarSign, FaUserTie, FaEnvelope, FaPhone, FaCalendar, FaUniversity, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";

const TeacherHome = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get("/tutors")
        .then((res) => {
          const matchedTutor = res.data.find(
            (tutor) => tutor.email === user.email
          );
          setProfile(matchedTutor || null);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tutors:", err);
          setIsLoading(false);
        });
    }
  }, [loading, user, axiosSecure]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#70C5D7]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-[#DA3A60] text-xl font-semibold mb-2">Profile Not Found</div>
        <p className="text-[#005482]">No tutor profile found for {user.email}</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Personal Information",
      icon: <FaUserTie className="text-[#70C5D7]" />,
      items: [
        { icon: <FaEnvelope className="text-[#005482]" />, label: "Email", value: profile.email },
        { icon: <FaCalendar className="text-[#005482]" />, label: "Date of Birth", value: profile.dateOfBirth },
        { icon: <FaPhone className="text-[#005482]" />, label: "Contact", value: profile.contactNumber },
        { icon: <FaMapMarkerAlt className="text-[#DA3A60]" />, label: "Location", value: profile.location },
      ],
    },
    {
      title: "Academic Information",
      icon: <FaGraduationCap className="text-[#70C5D7]" />,
      items: [
        { icon: <FaUniversity className="text-[#005482]" />, label: "Institution", value: profile.institution },
        { icon: <FaBook className="text-[#005482]" />, label: "Subjects", value: profile.subjects?.join(", ") },
        { icon: <FaGraduationCap className="text-[#005482]" />, label: "Qualifications", value: profile.educationalQualifications },
        { icon: <FaUserTie className="text-[#005482]" />, label: "Experience", value: `${profile.experience} years` },
      ],
    },
    {
      title: "Teaching Details",
      icon: <FaChalkboardTeacher className="text-[#70C5D7]" />,
      items: [
        { icon: <FaClock className="text-[#005482]" />, label: "Availability", value: profile.availability?.join(", ") },
        { icon: <FaDollarSign className="text-[#FCBB45]" />, label: "Hourly Rate", value: `$${profile.hourlyRate}` },
        { icon: <FaBook className="text-[#005482]" />, label: "Teaching Mode", value: profile.teachingMode },
        { icon: <FaCertificate className="text-[#005482]" />, label: "Certifications", value: profile.certifications?.join(", ") },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-[#70C5D7] p-8 text-center relative">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg mx-auto">
                    <img
                      src={profile.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                                     <div className="absolute -bottom-2 right-0 bg-[#4ade80] text-[#ffffff] px-3 py-1 rounded-full text-sm font-medium">
                     Active
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white mt-4 mb-2">{profile.name}</h1>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    Professional Educator
                  </span>
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    {profile.teachingMode}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-[#005482]" />
                    <span className="text-gray-600">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-[#005482]" />
                    <span className="text-gray-600">{profile.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#DA3A60]" />
                    <span className="text-gray-600">{profile.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-[#005482] mb-4">About Me</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {profile.bio || "No bio available"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sections */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Section - Moved to top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#70C5D7] bg-opacity-10 rounded-lg">
                    <FaUserTie className="text-[#70C5D7] text-xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#70C5D7]">{profile.experience}</div>
                    <div className="text-[#005482] font-medium text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#DA3A60] bg-opacity-10 rounded-lg">
                    <FaDollarSign className="text-[#DA3A60] text-xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#DA3A60]">${profile.hourlyRate}</div>
                    <div className="text-[#005482] font-medium text-sm">Hourly Rate</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#FCBB45] bg-opacity-10 rounded-lg">
                    <FaBook className="text-[#FCBB45] text-xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#FCBB45]">{profile.subjects?.length || 0}</div>
                    <div className="text-[#005482] font-medium text-sm">Subjects</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <div className="p-3 bg-[#70C5D7] bg-opacity-10 rounded-lg">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-[#005482]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">
                            {item.label}
                          </div>
                          <div className="text-[#005482] font-medium">
                            {item.value || "Not specified"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
