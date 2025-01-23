import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ViewPatient = () => {
  const { PatientId } = useParams(); // Get PatientId from the URL
  const { state } = useLocation(); // Access passed state (e.g., type)
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Use your auth token if required
        const response = await fetch(`${apiBaseUrl}/api/patient-details/${PatientId}?type=${state.type}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }

        const data = await response.json();
        setPatient(data.patient);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [PatientId, state.type]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Patient Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>Name:</strong> {patient.patientFullName}</p>
        <p><strong>Sex:</strong> {patient.Sex}</p>
        <p><strong>Birthdate:</strong> {new Date(patient.birthdate).toLocaleDateString()}</p>
        <p><strong>Contact Info:</strong> {patient.contactInfo}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Guardian:</strong> {patient.guardianFullName}</p>
        <p><strong>Guardian Contact:</strong> {patient.guardianContact}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewPatient;
