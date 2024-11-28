const db = require('../config/db');

const Availability = {
  getAllAvailability: (callback) => {
    db.query('SELECT * FROM availability', callback);
  }
};

module.exports = Availability;
