import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Import the back arrow icon

const API_BASE_URL = 'http://127.0.0.1:8000/api/'; // Replace with your Django backend URL if different

const GuardianRequestConsultation = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    description: '' // Added description field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE_URL}consultations/`, formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        description: ''
      });
    } catch (error) {
      console.error('Failed to request consultation:', error.response ? error.response.data : error.message);
      setError('Failed to request consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" />
      </button>

      <p className="text-gray-600 text-center max-w-lg mb-8">
        Fill out the form below to request a consultation. We'll get back to you as soon as possible.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Preferred Consultation Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label htmlFor="time" className="text-sm font-medium text-gray-700">
            Preferred Consultation Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide any additional details or concerns"
            rows="4"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className={`w-full py-3 text-white font-medium rounded-lg shadow ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Consultation Request'}
          </button>
        </div>

        {/* Error or Success Messages */}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-center">
            Consultation requested successfully! We will contact you soon.
          </p>
        )}
      </form>
    </div>
  );
};

export default GuardianRequestConsultation;
