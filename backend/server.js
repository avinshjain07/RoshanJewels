const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/env');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable security headers with permissive Cross-Origin Resource Policy
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Cross-Origin Resource Sharing (CORS) setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://roshan-jewels.vercel.app'
];

if (config.FRONTEND_URL) {
  const cleanFrontendUrl = config.FRONTEND_URL.trim().replace(/\/$/, '');
  if (cleanFrontendUrl && !allowedOrigins.includes(cleanFrontendUrl)) {
    allowedOrigins.push(cleanFrontendUrl);
  }
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    const cleanOrigin = origin.trim().replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(
      allowed => allowed.trim().replace(/\/$/, '') === cleanOrigin
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Temporary CORS debug endpoint (can be disabled by setting ENABLE_CORS_DEBUG=false or in production)
app.get('/api/debug/cors', (req, res) => {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_CORS_DEBUG !== 'true') {
    return res.status(403).json({ success: false, message: 'Debug endpoint disabled' });
  }
  res.json({
    success: true,
    frontendOrigin: process.env.FRONTEND_URL,
    requestOrigin: req.headers.origin,
    corsConfigured: true
  });
});

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
  console.log('=== Startup Environment Check ===');
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`process.env.FRONTEND_URL: ${process.env.FRONTEND_URL}`);
  console.log(`EMAIL_USER: ${process.env.EMAIL_USER}`);
  console.log('=================================');
});
