const VALID_ENQUIRY_TYPES = [
  'Product Enquiry',
  'Diamond Jewellery',
  'Gold Jewellery',
  'Silver Jewellery',
  'Custom Jewellery',
  'Pricing',
  'Bulk Order',
  'Complaint',
  'Feedback',
  'Other'
];

/**
 * Validator middleware for contact form submission
 */
function validateContactInputs(req, res, next) {
  const errors = {};

  let { name, email, phone, enquiryType, subject, message } = req.body;

  // Trim whitespace
  name = typeof name === 'string' ? name.trim() : '';
  email = typeof email === 'string' ? email.trim() : '';
  phone = typeof phone === 'string' ? phone.trim() : '';
  enquiryType = typeof enquiryType === 'string' ? enquiryType.trim() : '';
  subject = typeof subject === 'string' ? subject.trim() : '';
  message = typeof message === 'string' ? message.trim() : '';

  // Store trimmed variables back into req.body
  req.body.name = name;
  req.body.email = email;
  req.body.phone = phone;
  req.body.enquiryType = enquiryType;
  req.body.subject = subject;
  req.body.message = message;

  // Name Validation (required, min length 2)
  if (!name) {
    errors.name = 'Full name is required';
  } else if (name.length < 2) {
    errors.name = 'Full name must be at least 2 characters';
  }

  // Email Validation (required, regex check)
  if (!email) {
    errors.email = 'Email address is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please provide a valid email address';
    }
  }

  // Phone Validation (required, format regex check)
  if (!phone) {
    errors.phone = 'Phone number is required';
  } else {
    // Simple phone validator permitting common digits, +, -, spaces, parentheses (7 to 15 chars)
    const phoneRegex = /^[\d\s\-\+\(\)]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      errors.phone = 'Please provide a valid phone number';
    }
  }

  // Enquiry Type Validation (required, must belong to the valid dropdown array)
  if (!enquiryType) {
    errors.enquiryType = 'Enquiry type is required';
  } else if (!VALID_ENQUIRY_TYPES.includes(enquiryType)) {
    errors.enquiryType = 'Please select a valid enquiry type';
  }

  // Subject Validation (required, min length 3)
  if (!subject) {
    errors.subject = 'Subject is required';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }

  // Message Validation (required, min length 10)
  if (!message) {
    errors.message = 'Message is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // If validation failed, return 400 Bad Request
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the fields.',
      errors
    });
  }

  next();
}

module.exports = {
  validateContactInputs
};
