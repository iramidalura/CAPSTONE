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

const getAppointmentsForAdmin = (req, res) => {
  appointmentModel.getAppointmentsForAdmin((err, appointments) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve appointments', error: err });
    }
    res.json({ appointments });
  });
};

const getAppointmentsForGuardian = (guardianId, callback) => {
  const sql = `
    SELECT 
      a.id AS appointmentId,
      a.date,
      a.timeStart,
      a.timeEnd,
      a.description,
      a.status,
      CONCAT(g.firstname, ' ', g.middlename, ' ', g.lastname) AS guardianFullName,
      CONCAT(p.patientName) AS patientFullName
    FROM appointments a
    JOIN guardians g ON a.guardianId = g.id
    JOIN patients p ON a.patientId = p.id
    WHERE a.guardianId = ?
  `;

  db.execute(sql, [guardianId], callback);
};

const getAppointmentById = (appointmentId, callback) => {
  const sql = `
    SELECT 
    a.id AS appointmentId,
    a.date,
    a.timeStart,
    a.timeEnd,
    a.description,
    a.status,
    CONCAT(g.firstname, ' ', g.middlename, ' ', g.lastname) AS guardianFullName,
    u.email AS guardianEmail, -- Fetching email from the users table
    CONCAT(p.patientName) AS patientFullName,
    p.patientAge
    FROM appointments a
    JOIN guardians g ON a.guardianId = g.id
    JOIN users u ON g.user_id = u.id -- Joining with the users table
    JOIN patients p ON a.patientId = p.id
    WHERE a.id = ?;

  `;

  db.execute(sql, [appointmentId], callback);
};

const deleteAppointmentById = (appointmentId, callback) => {
  const sql = `DELETE FROM appointments WHERE id = ?`;

  db.execute(sql, [appointmentId], callback);
};

const getUpcomingAppointmentsForGuardian = (guardianId, callback) => {
  const sql = `
    SELECT 
      a.id AS appointmentId,
      a.date,
      TIME_FORMAT(a.timeStart, '%h:%i %p') AS timeStart,
      TIME_FORMAT(a.timeEnd, '%h:%i %p') AS timeEnd,
      a.description,
      a.status,
      CONCAT(g.firstname, ' ', g.lastname) AS guardianFullName,
      p.patientName AS patientFullName
    FROM appointments a
    JOIN guardians g ON a.guardianId = g.id
    JOIN patients p ON a.patientId = p.id
    WHERE a.guardianId = ? AND a.date >= CURDATE()
    ORDER BY a.date ASC, a.timeStart ASC;
  `;

  db.execute(sql, [guardianId], callback);
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


module.exports = { createAppointment, getAppointmentsForAdmin, getAppointmentsForGuardian, getAppointmentById, updateAppointmentStatus,
  deleteAppointmentById, getUpcomingAppointmentsForGuardian
 };
