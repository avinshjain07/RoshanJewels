const rateLimit = require('express-rate-limit');

// Rate limit config: 10 requests per 10 minutes per IP
const contactRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 10 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = contactRateLimiter;
