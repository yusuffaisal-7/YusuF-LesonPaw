import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to LesonPaw</h1>
          <p className="py-6">Connect with expert tutors or find academic support tailored to your needs.</p>
          <div className="space-x-4">
            <Link to="/register" className="btn btn-primary">
              <FaUserGraduate /> Register as Student
            </Link>
            <Link to="/register?role=teacher" className="btn btn-secondary">
              <FaChalkboardTeacher /> Register as Teacher
            </Link>
            <Link to="/services" className="btn btn-outline">Browse Services</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;