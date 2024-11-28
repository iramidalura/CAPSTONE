const db = require('../config/db');

// Controller to get all patients
const getAllPatients = (req, res) => {
  const sql = `
    SELECT id, patientName AS name, patientAge AS age, cellphone AS contact_number, 
           patientEmail AS email, address 
    FROM patients
  `;

  db.execute(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).json({ message: 'Error fetching patients', error: err });
    }

    res.status(200).json(results);
  });
};

module.exports = { getAllPatients };
