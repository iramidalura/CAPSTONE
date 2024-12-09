import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5';
import { jwtDecode } from 'jwt-decode';

const GuardianRequestAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    guardian: {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
    },
    patient: {
      id: '', // Initialize patient ID as an empty string
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
      informant: '',
      relation: '',
    },
    appointment: {
      date: '',
      time: '',
      description: '',
    },
  });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('User not authenticated.');

        const decoded = jwtDecode(token);
        const userEmail = decoded.email;

        const response = await axios.get(
          `http://localhost:5000/api/guardian-patient/${userEmail}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData((prevFormData) => ({
          ...prevFormData,
          guardian: response.data.guardian || {
            firstname: '',
            middlename: '',
            lastname: '',
            email: '',
          },
        }));
        console.log('Response from API:', response.data);

        console.log('Response:', response.data);


        setPatients(response.data.patients || []);
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (section, e) => {
    setFormData({
      ...formData,
      [section]: { ...formData[section], [e.target.name]: e.target.value },
    });
  };

  const handlePatientSelect = (e) => {
    const selectedPatientId = e.target.value;
    const selectedPatient = patients.find((p) => p.id === parseInt(selectedPatientId));
    setFormData((prevData) => ({
      ...prevData,
      patient: selectedPatient ? { ...selectedPatient, id: selectedPatientId } : { id: '' },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated.');

      await axios.post(
        'http://localhost:5000/api/appointments/',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(true);
    } catch (err) {
      setError('Failed to request appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" />
      </button>

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-4">Request Appointment</h1>
      <p className="text-gray-600 text-center max-w-lg mb-8">
        Fill out the form below to request an appointment. We’ll get back to you as soon as possible.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Guardian Info */}
        {/* <h2 className="text-lg font-semibold text-green-700">Guardian Information</h2> */}
        {/* Guardian fields (similar to provided) */}
	<div className="col-span-2">
          <h2 className="text-lg font-semibold text-green-700">Guardian Information</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.guardian.firstname}
            onChange={(e) => handleChange('guardian', e)}
            placeholder="Enter guardian's first name"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Middle Name
          </label>
          <input
            type="text"
            name="middlename"
            id="middlename"
            value={formData.guardian.middlename}
            onChange={(e) => handleChange('guardian', e)}
            placeholder="Enter guardian's middle name"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastname" className="text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.guardian.lastname}
            onChange={(e) => handleChange('guardian', e)}
            placeholder="Enter guardian's last name"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.guardian.email}
            onChange={(e) => handleChange('guardian', e)}
            placeholder="Enter guardian's email"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Patient Info */}
        <h2 className="text-lg font-semibold text-green-700">Patient Information</h2>
        <div className="flex flex-col">
          <label htmlFor="patientSelect" className="text-sm font-medium text-gray-700">
            Select Patient
          </label>
          <select
            id="patientSelect"
            name="patientSelect"
            value={formData.patient.id}
            onChange={handlePatientSelect}
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.patientName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            id="patientName"
            value={formData.patient.patientName || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="Patient Name"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        {/* Additional patient fields (populated dynamically) */}
	<div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Patient Age
          </label>
          <input
            type="text"
            name="patientAge"
            id="patientAge"
            value={formData.patient.patientAge || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="Patient Age"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Birthdate
          </label>
          <input
            type="text"
            name="birthdate"
            id="birthdate"
            value={formData.patient.birthdate || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="birthdate"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Sex
          </label>
          <select
            type="text"
            name="sex"
            id="sex"
            value={formData.patient.sex || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="Sex"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          >
            <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Birthplace
          </label>
          <input
            type="text"
            name="birthplace"
            id="birthplace"
            value={formData.patient.birthplace || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="Birthplace"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Religion
          </label>
          <input
            type="text"
            name="religion"
            id="religion"
            value={formData.patient.religion || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="religion"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middlename" className="text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.patient.address || ''}
            onChange={(e) => handleChange('patient', e)}
            placeholder="address"
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          />
        </div>

        {/* Appointment Details */}
        <h2 className="text-lg font-semibold text-green-700">Appointment Details</h2>
        {/* Appointment fields */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-medium rounded-lg shadow ${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">Appointment requested successfully!</p>}
      </form>
    </div>
  );
};

export default GuardianRequestAppointment;
