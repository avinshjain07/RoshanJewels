const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/env');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable security headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors({
  origin: [
    "http://localhost:5173",
    config.FRONTEND_URL
  ],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount endpoints
app.use('/api', contactRoutes);

// Server Status endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Fallback Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found'
  });
});

// Global Exception handler
app.use((err, req, res, next) => {
  console.error('Unhandled Global Error:', err);
  res.status(500).json({
    success: false,
    message: 'A fatal server error occurred.'
  });
});

// Bind to port
app.listen(PORT, () => {
  console.log('Server running');
  console.log(`Environment: ${config.NODE_ENV}`);
  console.log(`Port: ${PORT}`);
});
