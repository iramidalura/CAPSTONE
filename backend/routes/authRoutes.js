const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../controllers/authController');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const { createConsultation } = require('../controllers/consultationController');
const { getAvailability } = require('../controllers/availabilityController');
const { getPatientByGuardianId } = require('../controllers/patientController');
const { verifyRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser); 
router.get('/verify-email', verifyEmail); 

router.get('/guardian/dashboard', verifyRole(['Guardian']), (req, res) => {
    res.json({ message: 'Welcome to Guardian Dashboard' });
  });
  
  router.get('/pediatrician/dashboard', verifyRole(['Pediatrician']), (req, res) => {
    res.json({ message: 'Welcome to Pediatrician Dashboard' });
  });

router.post('/appointments', createAppointment);
router.get('/appointments', getAppointments);
router.post('/consultations', createConsultation);
router.get('/availability', getAvailability);
router.get('/patients', getPatientByGuardianId);

module.exports = router;
