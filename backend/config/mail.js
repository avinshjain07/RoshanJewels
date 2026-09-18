const nodemailer = require('nodemailer');
const config = require('./env');

// Configure SMTP Transporter using Central Config Module variables
const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: config.EMAIL_PORT === 465, // true for port 465
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  timeout: 10000, // 10 seconds timeout
});

// Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Warning / Error:', error.message);
  } else {
    console.log('SMTP configured successfully');
  }
});

module.exports = transporter;
