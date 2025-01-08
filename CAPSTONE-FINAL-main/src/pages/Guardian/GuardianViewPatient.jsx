import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { IoArrowBack } from 'react-icons/io5';

const GuardianViewPatient = () => {
  const { email } = useParams(); // Get email from the route parameter
  const navigate = useNavigate(); // Initialize navigate
  const [guardian, setGuardian] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuardianData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/patient/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGuardian(response.data.guardian);
        setPatients(response.data.patients);
      } catch (err) {
        console.error('Error fetching guardian data:', err);
        setError('Failed to fetch guardian details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuardianData();
  }, [email]);

  if (loading) {
    return <p className="text-lg text-green-800">Loading guardian details...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="p-10 bg-green-100 min-h-screen">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex items-center justify-center bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-10 h-10 mr-4"
        >
          <IoArrowBack className="text-lg" />
        </button>
        <h1 className="text-2xl font-bold">Guardian and Patient Details</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Guardian Details</h2>
        {guardian ? (
          <div className="mb-6">
            <p><strong>Name:</strong> {`${guardian.firstname} ${guardian.middlename || ''} ${guardian.lastname} ${guardian.extension || ''}`}</p>
            <p><strong>Email:</strong> {guardian.email}</p>
            <p><strong>Contact:</strong> {guardian.contact || 'No contact provided'}</p>
            <p><strong>Address:</strong> {guardian.guardianAddress}</p>
          </div>
        ) : (
          <p>No guardian details available.</p>
        )}

        <h2 className="text-2xl font-bold mb-4 mt-8">Patient Details</h2>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <div key={patient.id} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
              <p><strong>Patient Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Address:</strong> {patient.address}</p>
              <p><strong>Birth Date:</strong> {new Date(patient.birthdate).toLocaleDateString()}</p> {/* Formatted Birth Date */}
              <p><strong>Sex:</strong> {patient.sex}</p>
              <p><strong>Birth Place:</strong> {patient.birthplace}</p>
              <p><strong>Religion:</strong> {patient.religion}</p>
              <p><strong>Guardian:</strong> {patient.guardian}</p>
            </div>
          ))
        ) : (
          <p>No patients associated with this guardian.</p>
        )}
      </div>
    </div>
  );
};

export default GuardianViewPatient;
