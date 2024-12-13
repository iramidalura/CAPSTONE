import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/admin-appointments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleManageAppointment = async (appointmentId, status, date, time) => {
    try {
      await axios.post(
        'http://localhost:5000/api/admin/appointments/manage',
        { appointmentId, status, date, time },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setAppointments(appointments.filter((a) => a.id !== appointmentId));
    } catch (err) {
      setError('Failed to manage appointment');
    }
  };

  return (
    <div>
      <h1>Manage Appointments</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p>{appointment.patientName} - {appointment.date} - {appointment.time}</p>
            <button onClick={() => handleManageAppointment(appointment.id, 'accepted', appointment.date, appointment.time)}>Accept</button>
            <button onClick={() => handleManageAppointment(appointment.id, 'declined', appointment.date, appointment.time)}>Decline</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProfile;
