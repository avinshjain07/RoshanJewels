const { sendContactEmail } = require('../services/emailService');

/**
 * Express Controller handling POST /api/contact form submissions
 */
async function handleContactFormSubmission(req, res, next) {
  try {
    const { name, email, phone, enquiryType, subject, message, website } = req.body;

    // Honeypot basic spam bot protection
    if (website) {
      console.warn(`Spambot Honeypot triggered. Silent discard of request.`);
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your enquiry has been sent successfully.' // return success to fool bot
      });
    }

    // Capture caller IP address (behind proxy check)
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // Dispatch email transmission
    const result = await sendContactEmail({ 
      name, 
      email, 
      phone, 
      enquiryType, 
      subject, 
      message, 
      ipAddress 
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your enquiry has been sent successfully.',
      data: result
    });

  } catch (error) {
    console.error('Contact Form Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while sending your enquiry. Please try again later.',
      error: error.message
    });
  }
}

module.exports = {
  handleContactFormSubmission
};
