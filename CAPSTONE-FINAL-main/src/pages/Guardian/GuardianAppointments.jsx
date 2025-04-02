import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getAppointments = async () => {
  try {
    const response = await fetch('/api/appointments'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

const GuardianAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-10 h-screen">

      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center text-green-900 font-semibold text-lg border-b-2 border-green-300 pb-2">
          <span>Appointment ID</span>
          <span>Patient Name</span>
          <span>Date</span>
          <span>Time</span>
          <span>Actions</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.app_id} className="bg-white p-5 rounded-lg shadow mt-4 border border-gray-300">
              <div className="flex justify-between items-center text-gray-700">
                <span>{appointment.app_id}</span>
                <span>{appointment.patient_name}</span>
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                <span>{appointment.time}</span>
                <div className="flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1">
                    View
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-600 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-1">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-1">
                    Delete
                  </button>
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

export default GuardianAppointments;
