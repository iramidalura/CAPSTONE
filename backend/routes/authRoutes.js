const express = require('express');
const { registerUser, loginUser, verifyEmail, getGuardianAndPatientData } = require('../controllers/authController');
const { requestAppointment, getAppointmentsForAdmin, updateAppointmentStatus, getAppointmentsForGuardian, getAppointmentDetails,
  deleteAppointment, getUpcomingAppointmentsForGuardian, getAppointmentsForPediatrician, getAppointmentDetailsForPediatrician
 } = require('../controllers/appointmentController');
const { createConsultation } = require('../controllers/consultationController');
const { postAvailability, getMarkedDates } = require('../controllers/availabilityController');
const { getPatientData, updatePatientData } = require('../controllers/patientController');
const { verifyRole } = require('../middleware/authMiddleware');
const { getUserData, getListUser, getConverstation, getMessages, sendMessage } = require('../controllers/pediatricianController')
const { getGuardianProfile, updateGuardianProfile, getGuardianMessages, guardianSendMessage, createConversation, sendNewMessage } = require('../controllers/guardianController')
const upload = require('../middleware/multerMiddleware');
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
router.put('/patient/:id', verifyRole(['Guardian']), updatePatientData);

router.get('/guardian-msg/:id', verifyRole(['Guardian']), getGuardianMessages);
router.post('/guardian-send-msg', verifyRole(['Guardian']), guardianSendMessage);
router.post('/create-conversation', verifyRole(['Guardian']), createConversation);
router.post('/send-new-msg', verifyRole(['Guardian']), sendNewMessage);

router.get('/guardian-get-profile', verifyRole(['Guardian']), getGuardianProfile); 
router.put('/guardian-update-profile', verifyRole(['Guardian']), upload.single('profileImage'), updateGuardianProfile); 

router.get('/marked-dates', verifyRole(['Guardian', 'Pediatrician']), getMarkedDates);
router.post('/pedia-send-msg', verifyRole(['Guardian', 'Pediatrician']), sendMessage);

router.get('/user-data', verifyRole(['Pediatrician']), getUserData);
router.get('/user-list', verifyRole(['Pediatrician']), getListUser);
router.get('/conversation/:id', verifyRole(['Pediatrician']), getConverstation);
router.get('/messages/:id', verifyRole(['Pediatrician']), getMessages);

router.post('/availability', verifyRole(['Pediatrician']), postAvailability);
router.get('/get-appointments-pediatrician/:appointmentId', verifyRole(['Pediatrician']), getAppointmentDetailsForPediatrician);
router.get('/get-appointments-for-pediatrician', verifyRole(['Pediatrician']), getAppointmentsForPediatrician);


module.exports = router;
