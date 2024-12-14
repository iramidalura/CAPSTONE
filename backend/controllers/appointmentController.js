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
  appointmentModel.getAppointmentsForAdmin((err, appointments) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to retrieve appointments', error: err });
    }
    res.json({ appointments });
  });
};

// Update the status of an appointment
const updateAppointmentStatus = (req, res) => {
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

module.exports = { requestAppointment, getAppointmentsForAdmin, updateAppointmentStatus };
