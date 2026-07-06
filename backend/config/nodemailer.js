const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Ensure env variables are loaded from the backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  console.warn('Warning: EMAIL_USER or EMAIL_PASS environment variables are not configured.');
}

// Configure Yahoo SMTP Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: emailUser,
    pass: emailPass,
  },
  timeout: 10000, // 10 seconds timeout
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error.message);
  } else {
    console.log('Yahoo SMTP Connection verified successfully. Ready to send emails.');
  }
});

module.exports = transporter;
