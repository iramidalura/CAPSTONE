import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import logo from '../../assets/doctor.jpg';
import doctorImage from '../../assets/doctor.jpg';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    middlename: '',
    extension: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    guardianAddress: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate password strength
    if (!validatePassword(formData.password)) {
      alert(
        'Password must be 8-12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post(`${apiBaseUrl}/api/register`, formData);
  
      if (response.status === 201) {
        alert('Registration successful');
        setFormData({
          lastname: '',
          firstname: '',
          middlename: '',
          extension: '',
          email: '',
          contact: '',
          password: '',
          confirmPassword: '',
          guardianAddress: '',
        });
        navigate('/login'); // Navigate to Add Patient page after registration
      }
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };
  

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center overflow-y-auto px-6 py-10"
      style={{ backgroundImage: `url(${doctorImage})` }}
    >
      <div className="flex flex-row w-[90%] max-w-6xl p-8 bg-white border-2 border-gray-900 rounded-lg shadow-lg space-x-8">
        {/* Left Side: Intro */}
        <div className="hidden lg:flex flex-col justify-center items-start w-1/3 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
          <p className="text-gray-700 mb-8">
            Fill out the form to create your account and access our features.
          </p>
          <img
            src={logo}
            alt="welcome illustration"
            className="h-96 w-full object-cover rounded-lg"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col w-full lg:w-2/3">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-sm font-semibold mb-1">Middle Name</label>
                <input
                  type="text"
                  name="middlename"
                  placeholder="Middle Name"
                  value={formData.middlename}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Name Extension */}
              <div>
                <label className="block text-sm font-semibold mb-1">Name Extension</label>
                <input
                  type="text"
                  name="extension"
                  placeholder="Name Extension (e.g. Jr.) Leave blank if none"
                  value={formData.extension}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-semibold mb-1">Contact Number</label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Guardian Address */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold mb-1">Guardian Address</label>
                <input
                  type="text"
                  name="guardianAddress"
                  placeholder="Guardian Address"
                  value={formData.guardianAddress}
                  onChange={handleChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    minLength={8}
                    maxLength={12}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    minLength={8}
                    maxLength={12}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-green-500 rounded-full text-lg font-semibold hover:bg-green-600"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Proceed to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
