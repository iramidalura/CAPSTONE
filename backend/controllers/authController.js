const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Register a new user
const registerUser = (req, res) => {
  const { fullname, username, email, contact, password, userType, patientInfo } = req.body;
  console.log("Received data:", req.body);
  
  console.log("Registering user:", req.body); // <-- Add this log
  
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }
    
    User.createUser({ fullname, username, email, contact, password: hashedPassword, userType }, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Database error', error });
      }

      const guardianId = result.insertId;
      
      console.log("User created with ID:", guardianId); // <-- Log guardianId
      

      if (userType === 'Guardian' && patientInfo) {
        const patientData = { ...patientInfo, guardianId };
        console.log("Registering patient:", patientData); // <-- Add this log
        
        User.createPatient(patientData, (err) => {
          if (err) {
            console.error("Error creating patient:", err);
            return res.status(500).json({ message: 'Error creating patient', err });
          }
          res.status(201).json({ message: 'Guardian and patient registered successfully' });
        });
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }

      sendVerificationEmail(email);
    });
  });
};


// Login function to authenticate user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    });
  });
};

// Function to send verification email
const sendVerificationEmail = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail or any other SMTP service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Click the link to verify your email: ${verificationUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Email verification endpoint
const verifyEmail = (req, res) => {
  const token = req.query.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    User.updateEmailVerification(decoded.email, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error verifying email' });
      }

      res.json({ message: 'Email verified successfully' });
    });
  });
};

module.exports = { registerUser, loginUser, verifyEmail };
