import React, { useEffect, useState } from 'react';
import axios from 'axios';

// API base URL for fetching appointments
const API_BASE_URL = 'http://localhost:5000/api/appointments';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        console.log('Fetched appointments:', response.data); // Log the response data
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setError('Failed to fetch appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="flex-1 bg-green-100 p-10 h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-900">Appointments & Consultations</h1>

      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center text-green-900 font-semibold text-lg">
          <span>Appt. ID</span>
          <span>Patient Name</span>
          <span>Date</span>
          <span>Time</span>
          <span>Actions</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {loading ? (
          <p className="text-lg text-green-800">Loading appointments...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.app_id} className="bg-white p-5 rounded-lg shadow mt-4">
              <div className="flex justify-between items-center text-gray-700">
                <span>{appointment.app_id}</span>
                <span>{appointment.patient_name}</span>
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                <span>{appointment.time}</span>

                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:underline">View</button>
                  <button className="text-yellow-500 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-green-800">No appointments available.</p>
        )}
      </div>
    </main>
  );
};

export default Appointments;
