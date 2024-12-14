const express = require('express');
const { registerUser, loginUser, verifyEmail, getGuardianAndPatientData } = require('../controllers/authController');
const { requestAppointment, getAppointmentsForAdmin, updateAppointmentStatus } = require('../controllers/appointmentController');
const { createConsultation } = require('../controllers/consultationController');
const { postAvailability, getMarkedDates } = require('../controllers/availabilityController');
const { getPatientData } = require('../controllers/patientController');
const { verifyRole } = require('../middleware/authMiddleware');
const { getUserData } = require('../controllers/pediatricianController')
const { manageAppointmentRequest, getAppointmentRequests } = require('../controllers/adminController');

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

router.post('/appointments', verifyRole(['Guardian']), requestAppointment);
router.get('/appointments-get', verifyRole(['Admin']), getAppointmentsForAdmin);
router.put('/appointments-admin', verifyRole(['Admin']), updateAppointmentStatus);

router.post('/consultations', createConsultation);
router.post('/availability', verifyRole(['Pediatrician']), postAvailability);
router.get('/guardian-patient/:email', verifyRole(['Guardian']), getGuardianAndPatientData);
router.get('/patient/:email', verifyRole(['Guardian']), getPatientData);
router.get('/user-data', verifyRole(['Pediatrician']), getUserData);
router.get('/marked-dates', verifyRole(['Guardian', 'Pediatrician']), getMarkedDates);



module.exports = router;
