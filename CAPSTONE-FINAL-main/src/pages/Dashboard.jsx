import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        console.log('Fetched appointments:', response.data);
        const upcomingAppointments = response.data.filter(appointment => {

          const appointmentDate = new Date(appointment.date);
          const localAppointmentDate = new Date(appointmentDate.toLocaleString()); 
          localAppointmentDate.setHours(0, 0, 0, 0); 
        
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0); 

          console.log('Appointment Date:', new Date(appointmentDate)); 
          console.log('Current Date:', new Date(currentDate));
        
          return localAppointmentDate >= currentDate;
        });
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1 bg-green-100 p-10">
      <h1 className="text-2xl font-bold mb-6 text-green-900">Welcome to the Dashboard</h1>

      {/* Upcoming Schedule Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600 mb-6">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">Upcoming Schedule</h2>
        {appointments.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.app_id} className="p-4 bg-white shadow-md rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-md font-semibold text-green-700">{appointment.patient_name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(`/appointments/${appointment.app_id}`)} 
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-all">
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-green-800">No upcoming appointments.</p>
        )}
      </div>

      {/* Action Buttons in Square Shape */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/calendar" className="bg-white w-80 h-80 flex items-center justify-center p-5 rounded-lg shadow border-l-4 border-green-600 hover:bg-green-50">
          <h3 className="font-semibold text-lg text-green-900">View Calendar</h3>
        </Link>
        <button 
          onClick={() => navigate('/request-consultation')} 
          className="bg-white w-80 h-80 flex items-center justify-center p-5 rounded-lg shadow border-l-4 border-green-600 hover:bg-green-50">
          <h3 className="font-semibold text-lg text-green-900">Request Consultation</h3>
        </button>
        <button 
          onClick={() => navigate('/request-appointment')} 
          className="bg-white w-80 h-80 flex items-center justify-center p-5 rounded-lg shadow border-l-4 border-green-600 hover:bg-green-50">
          <h3 className="font-semibold text-lg text-green-900">Request Appointment</h3>
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
