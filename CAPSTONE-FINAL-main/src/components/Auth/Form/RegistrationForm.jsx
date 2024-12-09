import React, { useState } from 'react';
import UserTypeSelect from '../Auth/UserTypeSelect';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // You can use these icons for the "show/hide" feature

const RegistrationForm = ({ formData, handleChange, handleUserTypeChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Manage confirm password visibility

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex flex-col w-full lg:w-full">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account!</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-4">
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
          <div>
            <label className="block text-sm font-semibold mb-1">Name Extension</label>
            <input
              type="text"
              name="extension"
              placeholder="Name Extension"
              value={formData.extension}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
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

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500 pr-12" // Added padding to the right to fit the icon inside
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500 pr-12" // Added padding to the right to fit the icon inside
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-3xl"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        {/* Other Fields... */}
        <UserTypeSelect formData={formData} handleUserTypeChange={handleUserTypeChange} />
      </form>
    </div>
  );
};

export default RegistrationForm;
