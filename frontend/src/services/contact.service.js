import { post } from './api';

/**
 * Submit the contact form to the Express + Yahoo SMTP backend.
 * @param {object} formData - { name, email, phone, enquiryType, subject, message }
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitContactForm(formData) {
  return post('/contact', formData);
}
