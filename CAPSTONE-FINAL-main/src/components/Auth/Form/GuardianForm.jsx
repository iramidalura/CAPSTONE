import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Make sure to import these if you want to use eye icons
import { Link } from 'react-router-dom';
import PatientForm from './PatientForm';

const GuardianForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    nameExtension: '',
    address: '',
    contactNumber: '',
    nationality: '',
    confirmPassword: '',
  });

  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    patientAge: '',
    birthdate: '',
    sex: '',
    birthplace: '',
    religion: '',
    address: '',
    fatherName: '',
    fatherAge: '',
    fatherOccupation: '',
    motherName: '',
    motherAge: '',
    motherOccupation: '',
    cellphone: '',
    patientEmail: '',
    informant: '',
    relation: '',
    medicalHistory: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePatientChange = (e) =>
    setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine guardian and patient data
    const completeData = { ...formData, patientDetails };
    onSubmit(completeData);
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);


  return (
    <div className="flex flex-col w-full lg:w-full">
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* First Row */}
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
      <div className="grid grid-cols-2 gap-4">
        
        {/* Password Field */}
        <div className="relative">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
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
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
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
            name="nameExtension"
            placeholder="Name Extension"
            value={formData.nameExtension}
            onChange={handleChange}
            className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Nationality</label>
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

      </div>

      {/* Patient Information */}
      <div className="mt-6">
          <PatientForm
            patientDetails={patientDetails}
            handlePatientChange={handlePatientChange}
          />
        </div>
      {/* Other Fields... */}
      <div className="flex justify-center mt-6 w-full">
            <button
              type='submit'
              className="w-full py-3 text-white bg-green-500 rounded-full text-lg font-semibold hover:bg-green-600"
            >
              Submit
            </button>
          </div>
  
          {/* "Already have an account?" link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/loginpage" className="text-blue-600 font-semibold hover:underline">
                Proceed to Login
              </Link>
            </p>
          </div>
    </form>
    </div>
  );
};

export default GuardianForm;
