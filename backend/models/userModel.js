// models/userModel.js
const db = require('../config/db');

const createUser = (userData, callback) => {
  const sql = `
    INSERT INTO users (fullname, username, email, contact, password, userType)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.execute(
    sql,
    [userData.fullname, userData.username, userData.email, userData.contact, userData.password, userData.userType],
    (err, result) => {
      if (err) {
        console.error('Error executing createUser query:', err);
        return callback(err);
      }
      callback(null, result);
    }
  );
};

const createPatient = (patientData, callback) => {
  const sql = `
    INSERT INTO patients (guardian_id, patientName, patientAge, birthdate, sex, birthplace, religion, address, fatherName, fatherAge, fatherOccupation, motherName, motherAge, motherOccupation, cellphone, patientEmail, informant, relation, medicalHistory)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  console.log("SQL Query to Insert Patient:", sql);

  db.execute(
    sql,
    [
      patientData.guardianId, patientData.patientName, patientData.patientAge, patientData.birthdate,
      patientData.sex, patientData.birthplace, patientData.religion, patientData.address,
      patientData.fatherName, patientData.fatherAge, patientData.fatherOccupation,
      patientData.motherName, patientData.motherAge, patientData.motherOccupation,
      patientData.cellphone, patientData.patientEmail, patientData.informant,
      patientData.relation, patientData.medicalHistory,
    ],
    (err, result) => {
      if (err) {
        console.error('Error executing createPatient query:', err);
        return callback(err);
      }
      console.log('Patient inserted with ID:', result.insertId);
      callback(null, result);
    }
  );
};

const updateEmailVerification = (email, callback) => {
    const sql = `UPDATE users SET emailVerified = true WHERE email = ?`;
  
    db.execute(sql, [email], callback);
  };
  
  const findUserByEmail = (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
  
    db.execute(sql, [email], (err, result) => {
      if (err || result.length === 0) {
        return callback(err, null);
      }
  
      callback(null, result[0]);
    });
  };
  
  module.exports = { createUser, createPatient, updateEmailVerification, findUserByEmail };
