import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import SEO from '@components/Common/SEO/SEO';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmailFormat = (emailVal) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test((emailVal || '').trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const newFieldErrors = {};
    const trimmedEmail = email.trim();

    if (!name.trim()) newFieldErrors.name = 'Full name is required.';
    if (!trimmedEmail) {
      newFieldErrors.email = 'Email address is required.';
    } else if (!validateEmailFormat(trimmedEmail)) {
      newFieldErrors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }
    if (!phone.trim()) newFieldErrors.phone = 'Mobile number is required.';
    if (!password || password.length < 6) {
      newFieldErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError(Object.values(newFieldErrors)[0]);
      return;
    }

    setLoading(true);
    setFieldErrors({});
    try {
      await register({ name, email: trimmedEmail, phone, password });
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Registration failed.');
      if (err.message && err.message.toLowerCase().includes('email')) {
        setFieldErrors({ email: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Create Privilege Account | Roshan Jewels"
        description="Join Roshan Jewels Heritage Privilege Club to enjoy complimentary insured shipping, private VIP lounge booking, and bespoke previews."
      />

      <section className="auth-page-section">
        <div className="container">
          <div className="auth-card-wrapper">
            <div className="auth-card-badge">
              <i className="fas fa-gem"></i>
              <span>MEMBERSHIP PRIVILEGES</span>
            </div>

            <h2>Join Our Heritage Privilege Club</h2>
            <p className="auth-page-subtitle">
              Create an account to track your orders, save delivery addresses, and receive invitations to exclusive solitaire showcases.
            </p>

            {error && (
              <div className="auth-alert error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-page-form" noValidate>
              <div className="form-group">
                <label htmlFor="regName">
                  <i className="fas fa-user"></i> Full Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="regName"
                  className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Sanya Mehta"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: '' }));
                  }}
                  required
                />
                {fieldErrors.name && (
                  <span className="field-error-text">
                    <i className="fas fa-exclamation-circle"></i> {fieldErrors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="regEmail">
                  <i className="fas fa-envelope"></i> Email Address <span>*</span>
                </label>
                <input
                  type="email"
                  id="regEmail"
                  className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: '' }));
                  }}
                  required
                />
                {fieldErrors.email && (
                  <span className="field-error-text">
                    <i className="fas fa-exclamation-circle"></i> {fieldErrors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="regPhone">
                  <i className="fas fa-phone-alt"></i> Mobile Number <span>*</span>
                </label>
                <input
                  type="tel"
                  id="regPhone"
                  className={`form-control numeric-text ${fieldErrors.phone ? 'is-invalid' : ''}`}
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  required
                />
                {fieldErrors.phone && (
                  <span className="field-error-text">
                    <i className="fas fa-exclamation-circle"></i> {fieldErrors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="regPassword">
                  <i className="fas fa-lock"></i> Password <span>*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="regPassword"
                    className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: '' }));
                    }}
                    required
                  />
                  <button
                    type="button"
                    className="btn-toggle-pwd"
                    onClick={() => setShowPassword(p => !p)}
                    title={showPassword ? "Hide password" : "Show password"}
                    tabIndex="-1"
                  >
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </button>
                </div>
                {fieldErrors.password && (
                  <span className="field-error-text">
                    <i className="fas fa-exclamation-circle"></i> {fieldErrors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn-auth-page-submit"
                disabled={loading}
              >
                {loading ? (
                  <span><i className="fas fa-spinner fa-spin"></i> Creating Account...</span>
                ) : (
                  <span><i className="fas fa-crown"></i> Join Privilege Club</span>
                )}
              </button>
            </form>

            <div className="auth-page-switch">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign In here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
