import { useState, useCallback } from 'react';
import { submitContactForm } from '@services/contact.service';

// Validation helpers
function validateName(v)        { return v.trim().length >= 2 ? '' : 'Please enter your full name (at least 2 characters).'; }
function validateEmail(v)       { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; }
function validatePhone(v)       { return /^[\d\s\-\+\(\)]{7,15}$/.test(v.trim()) ? '' : 'Please enter a valid phone number (7 to 15 digits).'; }
function validateEnquiryType(v) { return v && v !== '' ? '' : 'Please select an enquiry type.'; }
function validateSubject(v)     { return v.trim().length >= 3 ? '' : 'Subject must be at least 3 characters.'; }
function validateMessage(v)     { return v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.'; }

const INITIAL_FIELDS = {
  name: '',
  email: '',
  phone: '',
  enquiryType: '',
  subject: '',
  message: '',
  website: '', // honeypot
};

/**
 * useContactForm — Custom hook to manage form state, validate input, and submit data.
 */
export function useContactForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {
      name: validateName(fields.name),
      email: validateEmail(fields.email),
      phone: validatePhone(fields.phone),
      enquiryType: validateEnquiryType(fields.enquiryType),
      subject: validateSubject(fields.subject),
      message: validateMessage(fields.message),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  }, [fields]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Honeypot spam bot check
      if (fields.website) {
        setStatus('success');
        setMessage('Thank you! Your enquiry has been sent successfully.');
        setFields(INITIAL_FIELDS);
        setErrors({});
        return;
      }

      if (!validate()) return;

      setStatus('loading');
      setMessage('');

      try {
        const result = await submitContactForm({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          enquiryType: fields.enquiryType,
          subject: fields.subject.trim(),
          message: fields.message.trim(),
        });
        setStatus('success');
        setMessage(result.message || 'Thank you! Your enquiry has been sent successfully.');
        setFields(INITIAL_FIELDS);
        setErrors({});
      } catch (err) {
        setStatus('error');
        setMessage(
          err?.message ||
          'Something went wrong. Please try again or contact us directly on WhatsApp.'
        );
      }
    },
    [fields, validate]
  );

  const resetForm = useCallback(() => {
    setFields(INITIAL_FIELDS);
    setErrors({});
    setStatus('idle');
    setMessage('');
  }, []);

  return { fields, errors, status, message, handleChange, handleSubmit, resetForm };
}
