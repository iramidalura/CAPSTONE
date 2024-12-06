import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/24/outline'; // For Heroicons v2
import { PhoneIcon, PencilIcon } from '@heroicons/react/24/outline'; // Additional icons

const GuardianDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API call to fetch appointments
        const appointmentsData = await getAppointments();
        const currentDate = new Date();

        // Filter to show only upcoming appointments
        const upcomingAppointments = appointmentsData.filter(appointment =>
          new Date(appointment.date) > currentDate
        );

        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-10 min-h-screen">
      {/* Welcome Message */}
      <h1 className="text-3xl font-extrabold mb-8 text-green-900 tracking-tight">
        Welcome to the Dashboard
      </h1>

      {/* Upcoming Schedule Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
          Upcoming Schedule
        </h2>
        {appointments.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.app_id} className="p-5 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-green-900">{appointment.patient_name}</h4>
                    <p className="text-sm text-gray-600 italic">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/appointments/${appointment.app_id}`)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700 font-light">No upcoming appointments scheduled yet.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* View Calendar Button */}
        <button
          onClick={() => navigate('/guardian/calendar')}
          className="bg-white w-full h-64 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:bg-green-50 transition-all hover:scale-105"
        >
          <CalendarIcon className="h-16 w-16 text-green-600 mb-4" /> {/* Calendar Icon */}
          <h3 className="font-bold text-xl text-green-800 tracking-wide">View Calendar</h3>
        </button>

        {/* Request Consultation Button */}
        <button
          onClick={() => navigate('/guardian/request-consultation')}
          className="bg-white w-full h-64 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:bg-green-50 transition-all hover:scale-105"
        >
          <PhoneIcon className="h-16 w-16 text-green-600 mb-4" /> {/* Phone Icon */}
          <h3 className="font-bold text-xl text-green-800 tracking-wide">Request Consultation</h3>
        </button>

        {/* Request Appointment Button */}
        <button
          onClick={() => navigate('/guardian/request-appointment')}
          className="bg-white w-full h-64 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:bg-green-50 transition-all hover:scale-105"
        >
          <PencilIcon className="h-16 w-16 text-green-600 mb-4" /> {/* Pencil Icon */}
          <h3 className="font-bold text-xl text-green-800 tracking-wide">Request Appointment</h3>
        </button>
      </div>
    </main>
  );
};

export default GuardianDashboard;
