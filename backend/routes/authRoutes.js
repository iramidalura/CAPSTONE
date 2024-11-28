const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/authController');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const { createConsultation } = require('../controllers/consultationController');
const { getAvailability } = require('../controllers/availabilityController');
const { getAllPatients } = require('../controllers/patientController');
const router = express.Router();

router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // User login
router.get('/verify-email', verifyEmail); // Email verification link
router.post('/appointments', createAppointment);
router.get('/appointments', getAppointments);
router.post('/consultations', createConsultation);
router.get('/availability', getAvailability);
router.get('/patients', getAllPatients);

module.exports = router;
