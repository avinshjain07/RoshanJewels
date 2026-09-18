import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import SEO from '@components/Common/SEO/SEO';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmailFormat = (emailVal) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test((emailVal || '').trim());
  };

  const handleFillDemo = () => {
    setEmail('avinshjain521@gmail.com');
    setPassword('Roshan@1965');
    setError('');
    setFieldErrors({});
  };

  const handleBlurEmail = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setFieldErrors(prev => ({ ...prev, email: 'Email address is required.' }));
    } else if (!validateEmailFormat(trimmed)) {
      setFieldErrors(prev => ({ ...prev, email: 'Please enter a valid email format (e.g. name@domain.com).' }));
    } else {
      setFieldErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleBlurPassword = () => {
    if (!password) {
      setFieldErrors(prev => ({ ...prev, password: 'Password is required.' }));
    } else if (password.length < 6) {
      setFieldErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters.' }));
    } else {
      setFieldErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const newFieldErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newFieldErrors.email = 'Email address is required.';
    } else if (!validateEmailFormat(trimmedEmail)) {
      newFieldErrors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!password) {
      newFieldErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newFieldErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError(newFieldErrors.email || newFieldErrors.password);
      return;
    }

    setLoading(true);
    setFieldErrors({});
    try {
      await login(trimmedEmail, password);
      navigate('/account');
    } catch (err) {
      const msg = err.message || 'Invalid email or password.';
      setError(msg);
      if (msg.toLowerCase().includes('password')) {
        setFieldErrors({ password: msg });
      } else if (msg.toLowerCase().includes('email')) {
        setFieldErrors({ email: msg });
      } else {
        setFieldErrors({ email: 'Check email', password: 'Check password' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In | Roshan Jewels Heritage Privilege"
        description="Sign in to your Roshan Jewels account to view your orders, saved addresses, and VIP concierge privileges."
      />

      <section className="auth-page-section">
        <div className="container">
          <div className="auth-card-wrapper">
            <div className="auth-card-badge">
              <i className="fas fa-crown"></i>
              <span>ROSHAN JEWELS PRIVILEGE</span>
            </div>

            <h2>Sign in to Your Account</h2>
            <p className="auth-page-subtitle">
              Welcome back to Roshan Jewels. Access your bespoke orders and saved delivery addresses.
            </p>

            {/* Demo Credentials Helper Pill */}
            <div className="demo-credentials-card">
              <div className="demo-creds-info">
                <span className="demo-label"><i className="fas fa-shield-alt"></i> Demo Patron Access:</span>
                <span className="demo-values numeric-text">avinshjain521@gmail.com • Roshan@1965</span>
              </div>
              <button
                type="button"
                className="btn-fill-demo"
                onClick={handleFillDemo}
                title="Auto-fill demo credentials"
              >
                Auto Fill
              </button>
            </div>

            {error && (
              <div className="auth-alert error">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-page-form" noValidate>
              <div className="form-group">
                <label htmlFor="loginEmail">
                  <i className="fas fa-envelope"></i> Email Address <span>*</span>
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                  placeholder="name@domain.com"
                  value={email}
                  onBlur={handleBlurEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email && validateEmailFormat(e.target.value)) {
                      setFieldErrors(prev => ({ ...prev, email: '' }));
                    }
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
                <label htmlFor="loginPassword">
                  <i className="fas fa-lock"></i> Password <span>*</span>
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="loginPassword"
                    className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    value={password}
                    onBlur={handleBlurPassword}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password && e.target.value.length >= 6) {
                        setFieldErrors(prev => ({ ...prev, password: '' }));
                      }
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
                  <span><i className="fas fa-spinner fa-spin"></i> Signing in...</span>
                ) : (
                  <span><i className="fas fa-shield-alt"></i> Sign In to Account</span>
                )}
              </button>
            </form>

            <div className="auth-page-switch">
              <p>
                Don’t have an account yet?{' '}
                <Link to="/register" className="auth-link">
                  Create a Privilege Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
