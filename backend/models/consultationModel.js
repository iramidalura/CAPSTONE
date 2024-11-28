const db = require('../config/db');

const Consultation = {
  createConsultation: (data, callback) => {
    const { name, email, date, time } = data;
    db.query('INSERT INTO consultations (name, email, date, time) VALUES (?, ?, ?, ?)', 
      [name, email, date, time], callback);
  }
};

module.exports = Consultation;
