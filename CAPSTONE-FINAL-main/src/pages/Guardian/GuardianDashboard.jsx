import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, PhoneIcon, PencilIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const GuardianDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage or context
        if (!token) {
          console.error('No token found, redirecting to login');
          navigate('/login'); // Redirect to login if no token
          return;
        }

        console.log('Token:', token); // Log the token for debugging

        const today = new Date(); // Get today's date for filtering

        // Fetch upcoming appointments
        const appointmentsResponse = await axios.get(`${apiBaseUrl}/api/get-upcoming-appointments`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        });

        console.log('Appointments API Response:', appointmentsResponse.data);

        const appointmentsData = appointmentsResponse.data;
        if (Array.isArray(appointmentsData) && appointmentsData.length > 0) {
          const filteredAppointments = appointmentsData.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= today; // Keep only present and future dates
          });

          const formattedAppointments = filteredAppointments.map((appointment) => ({
            ...appointment,
            date: new Date(appointment.date).toLocaleDateString(),
            time: `${appointment.timeStart} - ${appointment.timeEnd}`,
          }));

          console.log('Filtered and Formatted Appointments:', formattedAppointments);
          setAppointments(formattedAppointments);
        } else {
          console.log('No upcoming appointments found.');
          setAppointments([]); // Ensure appointments is empty if no data is returned
        }

        // Fetch upcoming consultations
        const consultationsResponse = await axios.get(`${apiBaseUrl}/api/get-upcoming-consultations`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        });

        console.log('Consultations API Response:', consultationsResponse.data);

        const consultationsData = consultationsResponse.data;
        if (Array.isArray(consultationsData) && consultationsData.length > 0) {
          const filteredConsultations = consultationsData.filter((consultation) => {
            const consultationDate = new Date(consultation.date);
            return consultationDate >= today; // Keep only present and future dates
          });

          const formattedConsultations = filteredConsultations.map((consultation) => ({
            ...consultation,
            date: new Date(consultation.date).toLocaleDateString(),
            time: `${consultation.timeStart} - ${consultation.timeEnd}`,
          }));

          console.log('Filtered and Formatted Consultations:', formattedConsultations);
          setConsultations(formattedConsultations);
        } else {
          console.log('No upcoming consultations found.');
          setConsultations([]); // Ensure consultations is empty if no data is returned
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error.response?.status === 401) {
          console.log('Unauthorized. Redirecting to login...');
          navigate('/login'); // Redirect to login on unauthorized
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <main className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      {/* Fixed Header Section */}
      <header className="fixed top-0 left-16 md:left-56 right-0 bg-gradient-to-br from-green-100 to-green-200 shadow-md p-6 z-50">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-3xl font-extrabold text-green-900 tracking-tight">
          Welcome to the Dashboard
        </h1>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={() => navigate('/guardian/calendar')}
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition-all"
          >
            <CalendarIcon className="h-5 w-5" />
            Calendar
          </button>
          <button
            onClick={() => navigate('/guardian/request-consultation')}
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition-all"
          >
            <PhoneIcon className="h-5 w-5" />
            Request Consultation
          </button>
          <button
            onClick={() => navigate('/guardian/request-appointment')}
            className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition-all"
          >
            <PencilIcon className="h-5 w-5" />
            Request Appointment
          </button>
        </div>
      </div>
    </header>

      {/* Main Content Section */}
      <div className="pt-28 p-10">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
            Upcoming Appointments
          </h2>
          {appointments.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {appointments.map((appointment) => (
                <li
                  key={appointment.appointmentId}
                  className="p-5 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium text-green-900">
                        {appointment.patientFullName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Date:</strong> {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Time:</strong> {appointment.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong> {appointment.status}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/guardian/get-appointments/${appointment.appointmentId}`)
                      }
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-700 font-light">
              No upcoming appointments scheduled yet.
            </p>
          )}
        </div>

        {/* Upcoming Consultations */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-8">
          <h2 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-400 pb-2">
            Upcoming Consultations
          </h2>
          {consultations.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {consultations.map((consultation) => (
                <li
                  key={consultation.consultationId}
                  className="p-5 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium text-green-900">
                        {consultation.patientFullName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <strong>Date:</strong> {consultation.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Time:</strong> {consultation.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Status:</strong> {consultation.status}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/guardian/get-consultations/${consultation.consultationId}`)
                      }
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-700 font-light">
              No upcoming consultations scheduled yet.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <button
            onClick={() => navigate('/guardian/calendar')}
            className="bg-white w-full h-64 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:bg-green-50 transition-all hover:scale-105"
          >
            <CalendarIcon className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="font-bold text-xl text-green-800 tracking-wide">View Calendar</h3>
          </button>

          <button
            onClick={() => navigate('/guardian/request-consultation')}
            className="bg-white w-full h-64 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:bg-green-50 transition-all hover:scale-105"
          >
            <PhoneIcon className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="font-bold text-xl text-green-800 tracking-wide">
              Request Consultation
            </h3>
          </button>

          <button
            onClick={() => navigate('/guardian/request-appointment')}
            className="bg-white w-full h-64 flex flex-col items-center justify-center p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:bg-green-50 transition-all hover:scale-105"
          >
            <PencilIcon className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="font-bold text-xl text-green-800 tracking-wide">
              Request Appointment
            </h3>
          </button>
        </div>
      </div>
    </main>
  );
};

export default GuardianDashboard;
