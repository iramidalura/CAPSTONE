const db = require('../config/db');

const Appointment = {
  getAllAppointments: (callback) => {
    db.query('SELECT * FROM appointments', callback);
  },

  createAppointment: (data, callback) => {
    const { patient_name, date, time, description } = data;
    db.query('INSERT INTO appointments (patient_name, date, time, description) VALUES (?, ?, ?, ?)', 
      [patient_name, date, time, description], callback);
  }
};

module.exports = Appointment;
