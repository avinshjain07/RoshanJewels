const transporter = require('../config/mail');
const config = require('../config/env');

/**
 * Sends customer enquiry email via Yahoo SMTP using Nodemailer.
 * @param {Object} details 
 * @param {string} details.name
 * @param {string} details.email
 * @param {string} details.phone
 * @param {string} details.enquiryType
 * @param {string} details.subject
 * @param {string} details.message
 * @param {string} details.ipAddress
 */
async function sendContactEmail({ name, email, phone, enquiryType, subject, message, ipAddress }) {
  const emailUser = config.EMAIL_USER;
  const emailTo = config.EMAIL_TO;

  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
  const timeStr = dateObj.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Escape HTML to prevent HTML injection inside emails
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeEnquiryType = escapeHtml(enquiryType);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const safeIp = escapeHtml(ipAddress || 'Unknown');

  // Luxury-themed HTML email template
  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Jewellery Enquiry</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6; margin: 0; padding: 0; background-color: #fcf6f7; }
        .container { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #fde2e4; box-shadow: 0 10px 30px rgba(220,130,150,0.05); }
        .header { background-color: #b23b4b; padding: 25px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px; }
        .content { padding: 30px; }
        .section-title { font-size: 18px; color: #b23b4b; border-bottom: 2px solid #fde2e4; padding-bottom: 8px; margin-bottom: 20px; font-family: 'Playfair Display', serif; }
        .field { margin-bottom: 20px; border-bottom: 1px solid #fde2e4; padding-bottom: 12px; }
        .label { font-weight: bold; color: #b48b5a; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; margin-bottom: 5px; }
        .value { font-size: 15px; color: #444444; }
        .message-box { background-color: #fffafb; border-left: 3px solid #b23b4b; padding: 15px; border-radius: 4px; margin-top: 5px; font-style: italic; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background-color: #fdf8f9; padding: 15px; border-radius: 8px; border: 1px solid #fde2e4; margin-top: 20px; }
        .meta-field { font-size: 12px; color: #666666; }
        .meta-label { font-weight: bold; color: #b23b4b; text-transform: uppercase; font-size: 10px; }
        .footer { background-color: #fde2e4; text-align: center; padding: 15px; font-size: 12px; color: #b23b4b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Roshan Jewels</h1>
        </div>
        <div class="content">
          <h2 class="section-title">Customer Inquiry Details</h2>
          
          <div class="field">
            <div class="label">Customer Name</div>
            <div class="value">${safeName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${safeEmail}" style="color: #d44c66; text-decoration: none;">${safeEmail}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value"><a href="tel:${safePhone}" style="color: #d44c66; text-decoration: none;">${safePhone}</a></div>
          </div>

          <div class="field">
            <div class="label">Enquiry Type</div>
            <div class="value">${safeEnquiryType}</div>
          </div>
          
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${safeSubject}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="value message-box">${safeMessage}</div>
          </div>

          <div class="meta-grid">
            <div class="meta-field">
              <div class="meta-label">Date</div>
              <div>${dateStr}</div>
            </div>
            <div class="meta-field">
              <div class="meta-label">Time</div>
              <div>${timeStr} (IST)</div>
            </div>
            <div class="meta-field" style="grid-column: span 2;">
              <div class="meta-label">IP Address</div>
              <div>${safeIp}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          &copy; ${dateObj.getFullYear()} Roshan Jewel - Indigo / Indore.
        </div>
      </div>
    </body>
    </html>
  `;

  // Send mail options
  const mailOptions = {
    from: `"Roshan Jewels Enquiry" <${emailUser}>`,
    to: emailTo,
    subject: `New Jewellery Enquiry - ${name}`,
    html: emailHtml,
    replyTo: email, // This allows owner to click reply to customer directly
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Enquiry email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer SMTP Error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

module.exports = {
  sendContactEmail,
};
