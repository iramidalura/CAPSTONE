const db = require('../config/db');

// Create a new appointment
const createAppointment = ({ date, timeStart, timeEnd, guardianId, patientId, description }, callback) => {
  const sql = `
    INSERT INTO appointments (date, timeStart, timeEnd, guardianId, patientId, description, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `;
  
  db.execute(sql, [date, timeStart, timeEnd, guardianId, patientId, description], callback);
};

// Get all appointments for the admin
const getAppointmentsForAdmin = (callback) => {
  const sql = `
    SELECT id, date, timeStart, timeEnd, guardianId, patientId, description, status
    FROM appointments
  `;
  
  db.execute(sql, [], callback);
};

// Update the status of an appointment
const updateAppointmentStatus = (appointmentId, status, callback) => {
  const sql = `
    UPDATE appointments
    SET status = ?
    WHERE id = ?
  `;

  console.log("Updating appointment status:", appointmentId, status);  // Add this log

  db.execute(sql, [status, appointmentId], (err, result) => {
    if (err) {
      console.error("Error updating appointment status:", err);  // Log the error
      return callback(err, null);
    }
    console.log("Appointment status updated:", result);  // Log the success result
    callback(null, result);
  });
};


module.exports = { createAppointment, getAppointmentsForAdmin, updateAppointmentStatus };
