const Appointment = require('../models/appointmentModel');

const getAppointments = (req, res) => {
  Appointment.getAllAppointments((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
    console.log('Fetched appointments from database:', results);
    res.json(results);
  });
};

const createAppointment = (req, res) => {
  const { patient_name, date, time, description } = req.body;
  const appointmentData = { patient_name, date, time, description };
  
  Appointment.createAppointment(appointmentData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create appointment' });
    }
    res.json({ app_id: result.insertId, message: 'Appointment created successfully' });
  });
};

module.exports = { getAppointments, createAppointment };
