/**
 * Base API fetch wrapper.
 * All API calls go through this module — never call fetch() directly in components.
 * Swap the implementation here to migrate to a different backend without touching UI.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * POST request helper with JSON body
 * @param {string} endpoint - e.g. '/contact'
 * @param {object} body     - JSON-serializable payload
 * @returns {Promise<object>} Parsed JSON response
 * @throws {object} Parsed error JSON from server
 */
export async function post(endpoint, body) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data; // Bubble up error object (contains validation messages)
  }

  return data;
}

/**
 * GET request helper
 * @param {string} endpoint - e.g. '/products'
 * @returns {Promise<object>} Parsed JSON response
 */
export async function get(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}
