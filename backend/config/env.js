const dotenv = require('dotenv');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';

// Define files to load based on environment
let envPath = path.join(__dirname, '../.env');

if (nodeEnv === 'production') {
  envPath = path.join(__dirname, '../.env.production');
} else if (nodeEnv === 'development') {
  envPath = path.join(__dirname, '../.env.development');
}

// Check if specific env file exists, fall back to default .env if not
const fs = require('fs');
if (!fs.existsSync(envPath)) {
  envPath = path.join(__dirname, '../.env');
}

// Load env variables
dotenv.config({ path: envPath });

const config = {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_TO: process.env.EMAIL_TO,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  NODE_ENV: nodeEnv,
};

// Required environment variables checklist
const requiredVars = [
  'EMAIL_USER',
  'EMAIL_PASS',
  'EMAIL_TO',
  'FRONTEND_URL',
];

const missingVars = requiredVars.filter((key) => !config[key]);

if (missingVars.length > 0) {
  console.error('\n======================================================');
  console.error('CRITICAL CONFIGURATION ERROR: Missing required environment variables:');
  missingVars.forEach((key) => {
    console.error(` - ${key}`);
  });
  console.error('Please configure them in your environment or env files.');
  console.error('======================================================\n');
  process.exit(1);
}

module.exports = config;
