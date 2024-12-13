const Appointment = require('../models/appointmentModel');
const db = require('../config/db');
const User = require('../models/userModel');

const getAppointments = (req, res) => {
  Appointment.getAllAppointments((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }
    console.log('Fetched appointments from database:', results);
    res.json(results);
  });
};



const requestAppointment = (req, res) => {
  const { date, time, guardian, patient, description } = req.body;

  if (!date || !time || !guardian || !patient) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  const query = `
    SELECT timeSlots FROM availability WHERE date = ?
  `;
  db.execute(query, [date], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      console.log(query)
      return res.status(500).json({ message: "Error checking availability." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No availability for the selected date." });
    }

    const timeSlots = result[0]?.timeSlots;
    let availableSlots;
    try {
      availableSlots = JSON.parse(timeSlots);
    } catch (parseError) {
      console.error("Error parsing timeSlots:", parseError);
      return res.status(500).json({ message: "Invalid time slots data." });
    }

    if (!availableSlots.includes(time)) {
      return res.status(409).json({ message: "Time slot is already booked." });
    }

    // Proceed with appointment insertion
    const appointmentQuery = `
      INSERT INTO appointments (
        date, time, guardian_id, guardian_firstname, guardian_lastname, guardian_email,
        patient_id, patient_name, description, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;
    const values = [
      date,
      time,
      guardian.id,
      guardian.firstname,
      guardian.lastname,
      guardian.email,
      patient.id,
      patient.patientName,
      description || null,
    ];

    db.execute(appointmentQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting appointment:", err);
        return res.status(500).json({ message: "Error creating appointment." });
      }

      res.status(201).json({ message: "Appointment requested successfully." });
    });
  });
};








module.exports = { getAppointments, requestAppointment };
