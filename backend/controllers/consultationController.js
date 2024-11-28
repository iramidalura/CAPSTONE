const Consultation = require('../models/consultationModel');

const createConsultation = (req, res) => {
  const { name, email, date, time } = req.body;
  const consultationData = { name, email, date, time };

  Consultation.createConsultation(consultationData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create consultation' });
    }
    res.json({ message: 'Consultation created successfully' });
  });
};

module.exports = { createConsultation };
