const db = require('../config/db');

const getPatientByGuardianId = (req, res) => {
  const guardianId = req.user.id; // Extracted from the JWT token

  if (!guardianId) {
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
      return res.status(404).json({ message: 'No patients found for this guardian.' });
    }

    res.status(200).json(results);
  });
};

module.exports = { getPatientByGuardianId };
