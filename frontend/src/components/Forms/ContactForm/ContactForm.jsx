import { useContactForm } from '@hooks/useContactForm';

/**
 * ContactForm — Controlled luxury contact form component.
 * Integrates error states, loading spinners, honeypot inputs, and status notifications.
 * Renders Full Name, Email, Phone, Subject, Enquiry Type, and Message.
 */
export default function ContactForm() {
  const {
    fields,
    errors,
    status,
    message,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="contact-form-container">
      <div className="form-header-badge">
        <i className="fas fa-envelope-open"></i>
        <span>DIRECT CONSULTATION</span>
      </div>

      <h3>Send an Enquiry</h3>
      <p className="form-subtitle">
        Have a question or looking for bespoke jewellery? Leave a message and our specialists will connect with you promptly.
      </p>

      {status === 'success' && (
        <div className="alert-box success">
          <i className="fas fa-check-circle"></i>
          <div>
            <strong>Enquiry Sent Successfully!</strong>
            <p>{message}</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="alert-box error">
          <i className="fas fa-exclamation-circle"></i>
          <div>
            <strong>Unable to Send Enquiry</strong>
            <p>{message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Spam Honeypot input - hidden from users, visible to bots */}
        <div style={{ display: 'none' }}>
          <label htmlFor="website">Leave this field blank</label>
          <input
            type="text"
            id="website"
            name="website"
            value={fields.website}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        {/* Name and Email Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i> Full Name <span>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control${errors.name ? ' error' : ''}`}
              placeholder="e.g. Rahul Sharma"
              value={fields.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="error-feedback" style={{ display: 'block' }}>
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-at"></i> Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control${errors.email ? ' error' : ''}`}
              placeholder="e.g. rahul@example.com"
              value={fields.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error-feedback" style={{ display: 'block' }}>
                {errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Phone and Enquiry Type Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">
              <i className="fas fa-phone-alt"></i> Phone Number <span>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-control numeric-text${errors.phone ? ' error' : ''}`}
              placeholder="e.g. +91 98765 43210"
              value={fields.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="error-feedback" style={{ display: 'block' }}>
                {errors.phone}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="enquiryType">
              <i className="fas fa-tags"></i> Enquiry Type <span>*</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              className={`form-control${errors.enquiryType ? ' error' : ''}`}
              value={fields.enquiryType}
              onChange={handleChange}
            >
              <option value="">Select Category...</option>
              <option value="Product Enquiry">Product Enquiry</option>
              <option value="Diamond Jewellery">Diamond Jewellery & Solitaires</option>
              <option value="Gold Jewellery">22K Gold Jewellery</option>
              <option value="Silver Jewellery">Sterling Silver Articles</option>
              <option value="Custom Jewellery">Bespoke / Custom Jewellery</option>
              <option value="Pricing">Price Quote / Gold Rate</option>
              <option value="Bulk Order">Bulk / Wedding Orders</option>
              <option value="Complaint">Complaint</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other Query</option>
            </select>
            {errors.enquiryType && (
              <div className="error-feedback" style={{ display: 'block' }}>
                {errors.enquiryType}
              </div>
            )}
          </div>
        </div>

        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject">
            <i className="fas fa-edit"></i> Subject <span>*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`form-control${errors.subject ? ' error' : ''}`}
            placeholder="e.g. Custom Bridal Necklace Consultation"
            value={fields.subject}
            onChange={handleChange}
          />
          {errors.subject && (
            <div className="error-feedback" style={{ display: 'block' }}>
              {errors.subject}
            </div>
          )}
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message">
            <i className="fas fa-comment-dots"></i> Message Details <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-control${errors.message ? ' error' : ''}`}
            placeholder="Describe your design preferences, budget expectations, diamond clarity, gold karat, or appointment requests..."
            value={fields.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <div className="error-feedback" style={{ display: 'block' }}>
              {errors.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <div className="spinner" style={{ display: 'block' }}></div>
              Sending Message...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              <span>Send Enquiry Message</span>
            </>
          )}
        </button>
      </form>

      {/* Form Assurance Pillars */}
      <div className="form-assurance-row">
        <div className="assurance-item">
          <i className="fas fa-user-shield"></i>
          <span>100% Confidential</span>
        </div>
        <div className="assurance-item">
          <i className="fas fa-bolt"></i>
          <span>Quick 24h Response</span>
        </div>
        <div className="assurance-item">
          <i className="fas fa-hand-holding-heart"></i>
          <span>No Obligation Advisory</span>
        </div>
      </div>
    </div>
  );
}

