import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import doctorImage from "../../assets/doctor.jpg";

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing token.');
      return;
    }

    axios.get(`http://localhost:5000/api/verify-email?token=${token}`)
      .then((response) => {
        setMessage(response.data.message);
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || 'Verification failed.');
      });
  }, [token, navigate]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundImage: `url(${doctorImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Set the background image
    >
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div> {/* Backdrop blur layer */}
      <div className="p-8 bg-white bg-opacity-75 shadow-lg rounded-lg max-w-md w-full z-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Email Verification</h1>
        <p className="text-lg text-center text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
