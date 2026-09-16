const express = require('express');
const router = express.Router();
const contactRateLimiter = require('../middleware/rateLimiter');
const { validateContactInputs } = require('../middleware/validator');
const { handleContactFormSubmission } = require('../controllers/contactController');

// Map POST /api/contact route
router.post('/contact', contactRateLimiter, validateContactInputs, handleContactFormSubmission);

module.exports = router;
