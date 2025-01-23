import React, { useEffect, useState } from 'react';
import {
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline'; // Heroicons for the icons

const AdminDashboard = () => {
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [consultationsToday, setConsultationsToday] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalConsultations, setTotalConsultations] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
      // Add your token here (e.g., from localStorage or state)
      const token = localStorage.getItem('token'); // Example: Adjust based on your app
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      // Fetch appointments
      const appointmentsResponse = await fetch('http://localhost:5000/api/appointments-get', { headers });
      if (!appointmentsResponse.ok) throw new Error('Failed to fetch appointments');
      const { appointments } = await appointmentsResponse.json();
      const todayAppointments = appointments.filter((appointment) => appointment.date === today);
      setAppointmentsToday(todayAppointments.length);
      setTotalAppointments(appointments.length);
  
      // Fetch consultations
      const consultationsResponse = await fetch('http://localhost:5000/api/consultations-get', { headers });
      if (!consultationsResponse.ok) throw new Error('Failed to fetch consultations');
      const { consultations } = await consultationsResponse.json();
      const todayConsultations = consultations.filter((consultation) => consultation.date === today);
      setConsultationsToday(todayConsultations.length);
      setTotalConsultations(consultations.length);
  
      // Fetch total patients
      const patientsResponse = await fetch('http://localhost:5000/api/patients-get', { headers });
      if (!patientsResponse.ok) throw new Error('Failed to fetch patients');
      const { patients } = await patientsResponse.json();
      setTotalPatients(patients.length);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error.message);
    }
  };
  

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <main className="flex-1 bg-gradient-to-br from-green-50 to-green-100 p-10 min-h-screen">
      {/* Welcome Message */}
      <h1 className="text-3xl font-extrabold mb-8 text-green-900 tracking-tight">
        Welcome to the Dashboard
      </h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Appointments Today */}
        <div className="bg-white p-10 rounded-xl shadow-lg border-l-4 border-green-500 flex flex-col items-center">
          <CalendarIcon className="h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-6xl font-extrabold text-green-700">{appointmentsToday}</h2>
          <p className="text-xl text-gray-700 mt-4">Appointments Today</p>
          <p className="text-sm text-gray-500">Total: {totalAppointments}</p>
        </div>

        {/* Consultations Today */}
        <div className="bg-white p-10 rounded-xl shadow-lg border-l-4 border-green-500 flex flex-col items-center">
          <ChatBubbleBottomCenterIcon className="h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-6xl font-extrabold text-green-700">{consultationsToday}</h2>
          <p className="text-xl text-gray-700 mt-4">Consultations Today</p>
          <p className="text-sm text-gray-500">Total: {totalConsultations}</p>
        </div>

        {/* Total Patients */}
        <div className="bg-white p-10 rounded-xl shadow-lg border-l-4 border-green-500 flex flex-col items-center">
          <UserGroupIcon className="h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-6xl font-extrabold text-green-700">{totalPatients}</h2>
          <p className="text-xl text-gray-700 mt-4">Total Patients</p>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
