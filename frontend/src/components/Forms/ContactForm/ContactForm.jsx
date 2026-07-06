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
      <h3>Send an Enquiry</h3>

      {status === 'success' && (
        <div className="alert-box success">
          <i className="fas fa-check-circle"></i>
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="alert-box error">
          <i className="fas fa-exclamation-circle"></i>
          <span>{message}</span>
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
              Full Name <span>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control${errors.name ? ' error' : ''}`}
              placeholder="Enter your full name"
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
              Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control${errors.email ? ' error' : ''}`}
              placeholder="Enter your email address"
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
              Phone Number <span>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-control${errors.phone ? ' error' : ''}`}
              placeholder="Enter your phone number"
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
              Enquiry Type <span>*</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              className={`form-control${errors.enquiryType ? ' error' : ''}`}
              value={fields.enquiryType}
              onChange={handleChange}
            >
              <option value="">Select enquiry type</option>
              <option value="Product Enquiry">Product Enquiry</option>
              <option value="Diamond Jewellery">Diamond Jewellery</option>
              <option value="Gold Jewellery">Gold Jewellery</option>
              <option value="Silver Jewellery">Silver Jewellery</option>
              <option value="Custom Jewellery">Custom Jewellery</option>
              <option value="Pricing">Pricing</option>
              <option value="Bulk Order">Bulk Order</option>
              <option value="Complaint">Complaint</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
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
            Subject <span>*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`form-control${errors.subject ? ' error' : ''}`}
            placeholder="Enter enquiry subject"
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
            Message <span>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-control${errors.message ? ' error' : ''}`}
            placeholder="Write your details or specifications here..."
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
              Sending Enquiry...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Send Enquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
