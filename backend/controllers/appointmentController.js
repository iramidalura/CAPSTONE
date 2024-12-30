const appointmentModel = require('../models/appointmentModel');
const db = require('../config/db');


// Request an appointment
const requestAppointment = (req, res) => {
  const { date, timeStart, timeEnd, guardianId, patientId, description } = req.body;
  console.log("Request body:", req.body);  // Add this to inspect the data being sent


  if (!date || !timeStart || !timeEnd || !guardianId || !patientId || !description) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  console.log("Formatted Date:", date);  // Check if the date is correctly formatted


  appointmentModel.createAppointment({ date, timeStart, timeEnd, guardianId, patientId, description }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create appointment', error: err });
    }
    res.status(201).json({ message: 'Appointment request submitted successfully.' });
  });
};

// Get all appointments for admin
const getAppointmentsForAdmin = (req, res) => {
  
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
  `;

  db.execute(sql, [], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve appointments', error: err });
    }
    res.json({ appointments: results });
  });
};


// Update the status of an appointment
const updateAppointmentStatus = (req, res) => {
  console.log('Received data in updateAppointmentStatus:', req.body);
  const { appointmentId, status } = req.body;

  if (!appointmentId || !status) {
    return res.status(400).json({ message: 'Appointment ID and status are required.' });
  }

  appointmentModel.updateAppointmentStatus(appointmentId, status, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to update appointment status', error: err });
    }
    res.json({ message: `Appointment status updated to ${status}.` });
  });
};

const getAppointmentsForGuardian = (req, res) => {
  const userId = req.user.id; // Extract user_id from the JWT token

  // Fetch the guardianId corresponding to the user_id
  appointmentModel.getGuardianId(userId, (err, guardianId) => {
    if (err) {
      console.error('Error fetching guardianId:', err);
      return res.status(500).json({ message: 'Failed to retrieve guardian ID', error: err });
    }

    if (!guardianId) {
      return res.status(404).json({ message: 'Guardian ID not found for the user' });
    }

    // Fetch appointments using the retrieved guardianId
    appointmentModel.getAppointmentsForGuardian(guardianId, (err, results) => {
      if (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ message: 'Failed to retrieve appointments', error: err });
      }

      res.json({ appointments: results });
    });
  });
};


const getAppointmentDetails = (req, res) => {
  const { appointmentId } = req.params;

  appointmentModel.getAppointmentById(appointmentId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve appointment details', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(results[0]);
  });
};

const deleteAppointment = (req, res) => {
  const { appointmentId } = req.params;

  appointmentModel.deleteAppointmentById(appointmentId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete appointment', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
};

const getUpcomingAppointmentsForGuardian = (req, res) => {
  const userId = req.user.id; // Extracted from the JWT token

  console.log('User ID:', userId); // Log the user ID for debugging

  // Fetch the guardianId using the userId
  appointmentModel.getGuardianId(userId, (err, guardianId) => {
    if (err) {
      console.error('Error fetching guardianId:', err); // Log error
      return res.status(500).json({ message: 'Failed to fetch guardian ID', error: err.message });
    }

    console.log('Guardian ID:', guardianId); // Log the fetched guardian ID

    // Fetch upcoming appointments using the correct guardianId
    appointmentModel.getUpcomingAppointmentsForGuardian(guardianId, (err, results) => {
      if (err) {
        console.error('Error fetching appointments:', err); // Log SQL error
        return res.status(500).json({ message: 'Failed to retrieve appointments', error: err.message });
      }

      console.log('Appointments fetched from DB:', results); // Log the results

      res.json(results); // Return upcoming appointments
    });
  });
};



module.exports = { requestAppointment, getAppointmentsForAdmin, updateAppointmentStatus, getAppointmentsForGuardian, getAppointmentDetails,
  deleteAppointment, getUpcomingAppointmentsForGuardian
 };
