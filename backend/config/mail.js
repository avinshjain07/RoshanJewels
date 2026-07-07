const nodemailer = require('nodemailer');
const config = require('./env');

// Configure Yahoo SMTP Transporter using Central Config Module variables
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
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
