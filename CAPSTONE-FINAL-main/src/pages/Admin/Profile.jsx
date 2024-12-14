import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments-get', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("Appointments fetched:", response.data.appointments);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await axios.put('http://localhost:5000/api/appointments-admin', 
        { appointmentId, status }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      // Re-fetch appointments after updating the status
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading appointments...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Appointment Dashboard</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-left text-sm text-gray-500">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Guardian</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{appointment.patientId}</td>
                <td className="px-6 py-4">{appointment.guardianId}</td>
                <td className="px-6 py-4">{appointment.date}</td>
                <td className="px-6 py-4">{appointment.timeStart} - {appointment.timeEnd}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${appointment.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : appointment.status.toLowerCase() === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  {appointment.status.toLowerCase() === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'approved')}
                        className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'declined')}
                        className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {appointment.status.toLowerCase() === 'approved' && <span className="text-green-600 font-semibold">Approved</span>}
                  {appointment.status.toLowerCase() === 'declined' && <span className="text-red-600 font-semibold">Declined</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
