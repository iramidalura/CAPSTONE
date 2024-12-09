// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json({
  origin: 'http://localhost:5173', // Allow only the frontend's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); // Use built-in JSON body parser from Express

// API Routes
app.use('/api', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Send a general message in production
  const message = isProduction ? 'Server encountered an error' : err.message;
  const status = err.status || 500;
  
  res.status(status).json({ message, error: isProduction ? null : err.stack });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("Registered routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route.path);
  }
});
