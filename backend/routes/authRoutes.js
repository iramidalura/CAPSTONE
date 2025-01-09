const express = require('express');
const { registerUser, loginUser, verifyEmail, getGuardianAndPatientData } = require('../controllers/authController');
const { requestAppointment, getAppointmentsForAdmin, updateAppointmentStatus, getAppointmentsForGuardian, getAppointmentDetails,
  deleteAppointment, getUpcomingAppointmentsForGuardian, getAppointmentsForPediatrician, getAppointmentDetailsForPediatrician
 } = require('../controllers/appointmentController');
const { createConsultation } = require('../controllers/consultationController');
const { postAvailability, getMarkedDates } = require('../controllers/availabilityController');
const { getPatientData } = require('../controllers/patientController');
const { verifyRole } = require('../middleware/authMiddleware');
const { getUserData } = require('../controllers/pediatricianController')
// const { manageAppointmentRequest, getAppointmentRequests } = require('../controllers/adminController');

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

router.get('/appointments-get', verifyRole(['Admin']), getAppointmentsForAdmin);
router.put('/appointments-admin', verifyRole(['Admin']), updateAppointmentStatus);

router.post('/consultations', createConsultation);
router.get('/guardian-patient/:email', verifyRole(['Guardian']), getGuardianAndPatientData);
router.get('/patient/:email', verifyRole(['Guardian']), getPatientData);
router.post('/appointments', verifyRole(['Guardian']), requestAppointment);
router.get('/get-appointments', verifyRole(['Guardian']), getAppointmentsForGuardian);
router.get('/get-appointments/:appointmentId', verifyRole(['Guardian']), getAppointmentDetails);
router.delete('/appointments/:appointmentId', verifyRole(['Guardian']), deleteAppointment);
router.get('/get-upcoming-appointments', verifyRole(['Guardian']), getUpcomingAppointmentsForGuardian);

router.get('/marked-dates', verifyRole(['Guardian', 'Pediatrician']), getMarkedDates);

router.get('/user-data', verifyRole(['Pediatrician']), getUserData);
router.post('/availability', verifyRole(['Pediatrician']), postAvailability);
router.get('/get-appointments-pediatrician/:appointmentId', verifyRole(['Pediatrician']), getAppointmentDetailsForPediatrician);
router.get('/get-appointments-for-pediatrician', verifyRole(['Pediatrician']), getAppointmentsForPediatrician);

module.exports = router;
