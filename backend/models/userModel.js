// models/userModel.js
const db = require('../config/db');

const createUser = (userData, callback) => {
  const sql = `
    INSERT INTO users (firstname, middlename, lastname, extension, email, contact, password, userType)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.execute(
    sql,
    [userData.firstname, userData.middlename, userData.lastname, userData.extension, userData.email, userData.contact, userData.password, userData.userType],
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

  db.execute(sql, [email], (err, result) => {
    if (err) {
      console.error(`Error updating email verification for email ${email}:`, err);
      return callback(err, null);
    }

    if (result.affectedRows === 0) {
      console.warn(`No user found with email: ${email}`);
      return callback(null, { message: 'No user found with the provided email' });
    }

    console.log(`Email verification updated successfully for ${email}`);
    callback(null, result);
  });
};

const findUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.execute(sql, [email], (err, result) => {
    if (err) {
      console.error(`Error finding user with email ${email}:`, err);
      return callback(err, null);
    }

    if (result.length === 0) {
      console.warn(`No user found with email: ${email}`);
      return callback(null, null);
    }

    console.log(`User found with email: ${email}`);
    callback(null, result[0]);
  });
};

  module.exports = { createUser, createPatient, updateEmailVerification, findUserByEmail };
