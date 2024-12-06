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
  const { patientId, date, time, description, guardianId } = req.body;

  const sql = `
    SELECT * FROM patients WHERE id = ? AND guardian_id = ?
  `;
  
  db.execute(sql, [patientId, guardianId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Invalid patient or guardian' });
    }

    const appointmentData = { patient_name: results[0].patientName, date, time, description };
    Appointment.createAppointment(appointmentData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create appointment' });
      }
      res.json({ app_id: result.insertId, message: 'Appointment created successfully' });
    });
  });
};

module.exports = { getAppointments, createAppointment };
