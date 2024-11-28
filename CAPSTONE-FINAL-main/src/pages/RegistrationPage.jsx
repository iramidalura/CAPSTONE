import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import logo from '../assets/kiddie.png';
import doctorImage from '../assets/doctor.jpg';
import axios from 'axios';


const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });
  const [patientDetails, setPatientDetails] = useState ({
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

  const [showPatientFrom, setShowPatientForm] = useState (false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    console.log("Updating field:", name, "with value:", value);
    setPatientDetails({ ...patientDetails, [name]: value});
  };

  const handleUserTypeChange = (e) => {
    const selectedUserType = e.target.value;
    console.log("User type changed:", e.target.value);
    setFormData({ ...formData, userType: selectedUserType });

    if(selectedUserType  == 'Guardian') {
      setShowPatientForm(true);
    } else {
      setShowPatientForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userData = {
        ...formData,
        patientInfo: showPatientFrom ? patientDetails : null,
      }
      console.log("Form data being sent:", userData);
      const response = await axios.post('http://localhost:5000/api/register', userData);
      console.log("Form data being sent:", userData);
      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center backdrop-blur-lg overflow-y-auto"
      style={{ backgroundImage: `url(${doctorImage})` }}
    >
      {/* Logo at the top-left corner with responsive sizing */}
      <div className="absolute top-0 left-0 p-4">
        <img
          src={logo}
          alt="logo"
          className="w-32 h-28 md:w-44 md:h-40 lg:w-56 lg:h-52 object-contain"
        />
      </div>

      {/* Centered Registration Form */}
      <div className="relative flex flex-col items-center w-full max-w-lg p-6 bg-white border-2 border-gray-900 rounded-lg shadow-lg mt-20 lg:mt-20">
        <h1 className="text-2xl font-bold text-center mb-4">Create an Account!</h1>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* First Row: Fullname, Email, and Contact Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
            <div className="md:col-span-2">
              <label className="w-full text-left text-sm font-semibold mb-1">Fullname (Lastname, Firstname, Middle Initial)</label>
              <input
                type="text"
                name="fullname"
                placeholder="(Lastname, Firstname, Middle Initial)"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="w-full text-left text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="w-full text-left text-sm font-semibold mb-1">Email Address</label>
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
            <div className="md:col-span-2">
              <label className="w-full text-left text-sm font-semibold mb-1">Contact Number</label>
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
          </div>

          {/* Second Row: Password and Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
            <div>
              <label className="w-full text-left text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength={8}
                maxLength={12}
              />
            </div>
            <div>
              <label className="w-full text-left text-sm font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength={8}
                maxLength={12}
              />
            </div>
          </div>

          {/* User Type Field */}
          <div className="mb-4 w-full">
            <label className="w-full text-left text-sm font-semibold mb-1">User Type</label>
            <select
              name="userType"
              className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.userType}
              onChange={handleUserTypeChange}
              required
            >
              <option value="" >Select User Type</option>
              <option value="Admin">Admin</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>

          {/* Conditionally Rendered Patient Registration Form */}
          {showPatientFrom && (
            <div className="mt-4 w-full">
              <h2 className="text-xl font-bold text-center mb-2">Register Patient </h2>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Patient Name (Lastname, Firstname, Middle Initial)</label>
                <input
                  type="text"
                  name="patientName"
                  placeholder="(Lastname, Firstname, Middle Initial)"
                  value={patientDetails.patientName}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Patient Age</label>
                <input
                  type="number"
                  name="patientAge"
                  placeholder="Patient Age"
                  value={patientDetails.patientAge}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={patientDetails.birthdate}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="w-full text-left text-sm font-semibold mb-1">Sex</label>
                  <select
                    id="sex"
                    name="sex"
                    value={patientDetails.sex}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="w-full text-left text-sm font-semibold mb-1">Birthplace</label>
                  <input
                    type="text"
                    name="birthplace"
                    placeholder="Birthplace"
                    value={patientDetails.birthplace}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Religion</label>
                <input
                  type="text"
                  name="religion"
                  placeholder="Religion"
                  value={patientDetails.religion}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={patientDetails.address}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="w-full text-left text-sm font-semibold mb-1">Father's Name (Lastname, Firstname, Middle Initial)</label>
                  <input
                    type="text"
                    name="fatherName"
                    placeholder="(Lastname, Firstname, Middle Initial)"
                    value={patientDetails.fatherName}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="w-full text-left text-sm font-semibold mb-1">Father's Age</label>
                  <input
                    type="number"
                    name="fatherAge"
                    placeholder="Father's Age"
                    value={patientDetails.fatherAge}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="w-full text-left text-sm font-semibold mb-1">Father's Occupation</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    placeholder="Father's Occupation"
                    value={patientDetails.fatherOccupation}
                    onChange={(e) => {
                      console.log("Father's Occupation changed to:", e.target.value); // Debugging line
                      setPatientDetails({ ...patientDetails, fatherOccupation: e.target.value });
                    }}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="w-full text-left text-sm font-semibold mb-1">Mother's Name (Lastname, Firstname, Middle Initial)</label>
                  <input
                    type="text"
                    name="motherName"
                    placeholder="(Lastname, Firstname, Middle Initial)"
                    value={patientDetails.motherName}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="w-full text-left text-sm font-semibold mb-1">Mother's Age</label>
                  <input
                    type="number"
                    name="motherAge"
                    placeholder="Mother's Age"
                    value={patientDetails.motherAge}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="w-full text-left text-sm font-semibold mb-1">Mother's Occupation</label>
                  <input
                    type="text"
                    name="motherOccupation"
                    placeholder="Mother's Occupation"
                    value={patientDetails.motherOccupation}
                    onChange={handlePatientChange}
                    className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Cellphone Number(s)</label>
                <input
                  type="tel"
                  name="cellphone"
                  placeholder="Cellphone Number(s)"
                  value={patientDetails.cellphone}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  name="patientEmail"
                  placeholder="Email Address"
                  value={patientDetails.patientEmail}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Informant</label>
                <input
                  type="text"
                  name="informant"
                  placeholder="Informant"
                  value={patientDetails.informant}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Relation to Patient</label>
                <input
                  type="text"
                  name="relation"
                  placeholder="Relation to Patient"
                  value={patientDetails.relation}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-full border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="w-full text-left text-sm font-semibold mb-1">Medical History</label>
                <textarea
                  name="medicalHistory"
                  placeholder="Medical History"
                  value={patientDetails.medicalHistory}
                  onChange={handlePatientChange}
                  className="w-full p-3 border-2 rounded-lg border-gray-500 bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  required
                />
              </div>
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#1ED754] rounded-full text-xl font-semibold hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? Login link */}
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
  );
};

export default RegistrationPage;
