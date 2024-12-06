import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5'; 

const GuardianRequestAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patient_name: '',
    email: '',
    patientId: '',
    date: '',
    time: '',
    description: '',
  });
  const [doctorAvailability, setDoctorAvailability] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const guardianId = localStorage.getItem('guardianId'); // Get guardianId from localStorage

  // Fetch patients and doctor availability
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const guardianId = localStorage.getItem('guardianId'); // Ensure this is available
      console.log('Guardian ID:', guardianId); // Debugging line

      if (!guardianId) {
        setError('Guardian ID is missing.');  
        return;
      }
        
        const [patientsResponse, availabilityResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/patients', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'guardianid': guardianId,
            },
          }),
          axios.get('http://localhost:5000/api/availability'),
        ]);

        setPatients(patientsResponse.data);
        setDoctorAvailability(availabilityResponse.data);

        if (patientsResponse.data.length > 0) {
          const { Id, name, email } = patientsResponse.data[0];
          setFormData({ ...formData, patientId: Id, patient_name: name, email });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      }
    };

    if (guardianId) {
      fetchData();
    } else {
      setError('Guardian ID is missing.');
    }
  }, [guardianId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('http://localhost:5000/api/appointments', {
        patientId: formData.patientId,
        guardianId,
        ...formData,
      });
      setSuccess(true);
      setFormData({
        patient_name: '',
        email: '',
        patientId: '',
        date: '',
        time: '',
        description: '',
      });
    } catch (error) {
      console.error('Failed to request appointment:', error.response ? error.response.data : error.message);
      setError('Failed to request appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-green-50 to-green-100 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
      >
        <IoArrowBack className="text-lg" />
      </button>

      <h1 className="text-4xl font-extrabold text-green-700 mb-4">Request Appointment</h1>
      <p className="text-gray-600 text-center max-w-lg mb-8">
        Fill out the form below to request an appointment. We’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg space-y-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="patient_name" className="text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <select
            name="patient_name"
            id="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

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
            disabled
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <select
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          >
            <option value="">Select a date</option>
            {doctorAvailability.map((availability) => (
              <option key={availability.date} value={availability.date}>
                {availability.date}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="time" className="text-sm font-medium text-gray-700">
            Appointment Time
          </label>
          <select
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          >
            <option value="">Select a time</option>
            {doctorAvailability
              .filter((availability) => availability.date === formData.date)
              .map((availability) => (
                <option key={availability.time} value={availability.time}>
                  {availability.time}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide any additional details or concerns"
            rows="4"
            required
            className="mt-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          ></textarea>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className={`w-full py-3 text-white font-medium rounded-lg shadow ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">Appointment request submitted successfully!</p>}
      </form>
    </div>
  );
};

export default GuardianRequestAppointment;
