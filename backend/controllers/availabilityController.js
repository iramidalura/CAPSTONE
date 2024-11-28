const Availability = require('../models/availabilityModel');

const getAvailability = (req, res) => {
  Availability.getAllAvailability((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }
    res.json(results);
  });
};

module.exports = { getAvailability };
