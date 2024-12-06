// controllers/patientController.js
const db = require('../config/db');

// Get patient details by guardianId
const getPatientByGuardianId = (req, res) => {
  const guardianId = req.headers.guardianid; // Get the guardianId from the request headers
  if (!guardianId) {
    console.error('Guardian ID missing in request.');
    return res.status(400).json({ message: 'Guardian ID is required.' });
  }

  const sql = `
    SELECT id, patientName AS name, patientAge AS age, patientEmail AS email, address 
    FROM patients 
    WHERE guardian_id = ?
  `;

  db.execute(sql, [guardianId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error fetching patient data.' });
    }

    if (!results || results.length === 0) {
      console.warn(`No patients found for guardian ID: ${guardianId}`);
      return res.status(404).json({ message: 'No patients found for this guardian.' });
    }

    res.status(200).json(results);
  });
};




module.exports = { getPatientByGuardianId };
