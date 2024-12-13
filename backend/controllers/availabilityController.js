const User = require('../models/userModel');
const { verifyRole } = require('../middleware/authMiddleware')
const db = require('../config/db');
const moment = require('moment-timezone');

const postAvailability = (req, res) => {
  const { name, email, date, timeSlots, status } = req.body;
  const user_id = req.user.id;

  if (!name || !email || !date || !timeSlots || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const formattedDate = moment.tz(date, "Asia/Manila").format("YYYY-MM-DD");

  const availabilityData = {
    name,
    email,
    date: formattedDate,
    timeSlots,
    status,
    user_id,
  };

  const query = `
    INSERT INTO availability (user_id, name, email, date, timeSlots, status)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      timeSlots = VALUES(timeSlots), 
      status = VALUES(status)
  `;

  db.execute(
    query,
    [
      availabilityData.user_id,
      availabilityData.name,
      availabilityData.email,
      availabilityData.date,
      JSON.stringify(availabilityData.timeSlots),
      availabilityData.status,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({
        message: "Availability saved successfully",
        availability: availabilityData,
        result,
      });
    }
  );
};


const getMarkedDates = (req, res) => {
  const userRole = req.user.userType;
  const userId = req.user.id;

  let query;
  let params;

  if (userRole === "Pediatrician") {
    query = `SELECT date, status FROM availability WHERE user_id = ?`;
    params = [userId];
  } else if (userRole === "Guardian") {
    query = `SELECT date, status, timeSlots, name, email FROM availability`;
    params = [];  
  } else {
    return res.status(403).json({ message: "Unauthorized role" });
  }

  console.log("Executing query:", query, params);
  db.execute(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    const markedDates = results.reduce((acc, row) => {
      const localDate = moment(row.date).tz("Asia/Manila").format("YYYY-MM-DD");
      acc[localDate] = {
        status: row.status,
        name: row.name,
        email: row.email,
        timeSlots: Array.isArray(row.timeSlots)
        ? row.timeSlots
        : JSON.parse(row.timeSlots || "[]"),
      };
      return acc;
    }, {});

    res.json(markedDates);
  });
};

const updateAvailability = (date, time, userId) => {
  // Move the selected time from timeSlots to bookedTime
  const query = `
    UPDATE availability
    SET timeSlots = JSON_REMOVE(timeSlots, '$[?(@ == ?)]'),
        bookedTime = JSON_ARRAY_APPEND(bookedTime, '$', ?)
    WHERE user_id = ? AND date = ?
  `;
  db.execute(
    query,
    [time, time, time, userId, date],
    (err, result) => {
      if (err) {
        console.error("Error updating availability:", err);
        return res.status(500).json({ message: "Error updating availability" });
      }
      res.status(200).json({ message: "Appointment accepted and availability updated." });
    }
  );
};




module.exports = { postAvailability, getMarkedDates, updateAvailability };
