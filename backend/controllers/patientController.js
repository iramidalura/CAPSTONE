const User = require('../models/userModel');
const db = require('../config/db');

const getPatientData = (req, res) => {
  const { email } = req.user;

  if (!email) {
    return res.status(400).json({ message: 'Email is missing in request.' });
  }

  const sql = `
    SELECT 
      u.email AS email,
      g.id AS guardian_id,
      g.user_id,
      g.firstname AS firstname,
      g.middlename AS middlename,
      g.lastname AS lastname,
      g.extension,
      g.contact,
      p.id AS patient_id,
      p.patientName AS name,
      p.patientAge AS age,
      p.address
    FROM users u
    JOIN guardians g ON u.id = g.user_id
    LEFT JOIN patients p ON g.id = p.guardian_id
    WHERE u.email = ?
  `;

  db.execute(sql, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database query error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No data found for the given email' });
    }

    console.log('Query results:', results);

    const guardian = {
      id: results[0].guardian_id,
      user_id: results[0].user_id,
      email: results[0].email,
      firstname: results[0].firstname,
      middlename: results[0].middlename,
      lastname: results[0].lastname,
      extension: results[0].extension,
      contact: results[0].contact,
    };

    const patients = results
      .filter((row) => row.patient_id)
      .map((row) => ({
        id: row.patient_id,
        name: row.name || 'N/A',
        age: row.age || 'Unknown',
        guardian: row.guardian || `${row.firstname || ''} ${row.middlename || ''} ${row.lastname || ''}`,
        email: row.email,
        address: row.address || 'No address provided',
      }));

    res.json({ guardian, patients });
  });
};

module.exports = { getPatientData };
