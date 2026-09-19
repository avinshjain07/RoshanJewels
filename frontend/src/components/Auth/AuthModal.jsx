import { useState, useEffect } from 'react';
import { useAuth } from '@context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, loginAsDemo, register } = useAuth();
  const [mode, setMode] = useState(authModalMode); // 'login' | 'register' | 'forgot'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    setMode(authModalMode);
    setError('');
    setFieldErrors({});
    setSuccessMsg('');
  }, [authModalMode, isAuthModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const validateEmailFormat = (emailVal) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test((emailVal || '').trim());
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

  const handleBlurPhone = () => {
    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      setFieldErrors(prev => ({ ...prev, phone: 'Mobile number is required.' }));
    } else if (digits.length < 10) {
      setFieldErrors(prev => ({ ...prev, phone: 'Please enter a valid 10-digit mobile number.' }));
    } else {
      setFieldErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleBlurName = () => {
    if (!name.trim()) {
      setFieldErrors(prev => ({ ...prev, name: 'Full name is required.' }));
    } else {
      setFieldErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const handleFillDemo = () => {
    setEmail('avinshjain521@gmail.com');
    setPassword('Roshan@1965');
    setError('');
    setFieldErrors({});
  };

  const handleInstantDemoLogin = async () => {
    setError('');
    setFieldErrors({});
    setLoading(true);
    try {
      await loginAsDemo();
    } catch (err) {
      setError(err.message || 'Instant demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    const newFieldErrors = {};

    const trimmedEmail = email.trim();

    if (mode === 'login') {
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
      try {
        await login(trimmedEmail, password);
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
    } else if (mode === 'register') {
      if (!name.trim()) newFieldErrors.name = 'Full name is required.';
      if (!trimmedEmail) {
        newFieldErrors.email = 'Email address is required.';
      } else if (!validateEmailFormat(trimmedEmail)) {
        newFieldErrors.email = 'Please enter a valid email format (e.g. name@domain.com).';
      }
      const digits = phone.replace(/\D/g, '');
      if (!phone.trim()) {
        newFieldErrors.phone = 'Mobile number is required.';
      } else if (digits.length < 10) {
        newFieldErrors.phone = 'Please enter a valid 10-digit mobile number.';
      }
      if (!password || password.length < 6) {
        newFieldErrors.password = 'Password must be at least 6 characters.';
      }

      if (Object.keys(newFieldErrors).length > 0) {
        setFieldErrors(newFieldErrors);
        setError(Object.values(newFieldErrors)[0]);
        return;
      }

      setLoading(true);
      try {
        await register({ name, email: trimmedEmail, phone, password });
      } catch (err) {
        setError(err.message || 'Registration failed.');
        if (err.message && err.message.toLowerCase().includes('email')) {
          setFieldErrors({ email: err.message });
        }
      } finally {
        setLoading(false);
      }
    } else if (mode === 'forgot') {
      if (!trimmedEmail) {
        newFieldErrors.email = 'Please enter your registered email address.';
      } else if (!validateEmailFormat(trimmedEmail)) {
        newFieldErrors.email = 'Please enter a valid email format (e.g. name@domain.com).';
      }

      if (Object.keys(newFieldErrors).length > 0) {
        setFieldErrors(newFieldErrors);
        setError(newFieldErrors.email);
        return;
      }

      setLoading(true);
      try {
        setSuccessMsg(`Password reset instructions have been dispatched to ${trimmedEmail}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="auth-modal-close"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Modal Brand Header */}
        <div className="auth-modal-header">
          <div className="auth-badge">
            <i className="fas fa-crown"></i>
            <span>ROSHAN JEWELS PRIVILEGE</span>
          </div>
          <h3>
            {mode === 'login' && 'Sign in to Your Account'}
            {mode === 'register' && 'Join Our Heritage Privilege Club'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="auth-subtitle">
            {mode === 'login' && 'Access your bespoke orders, saved addresses, and VIP concierge privileges.'}
            {mode === 'register' && 'Experience complimentary insured shipping, private lounge viewing, and exclusive previews.'}
            {mode === 'forgot' && 'Enter your email address and we will send you a secure verification link.'}
          </p>
        </div>

        {/* Mode Switcher Tabs (Hidden in forgot mode) */}
        {mode !== 'forgot' && (
          <div className="auth-mode-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
            >
              <i className="fas fa-sign-in-alt"></i> Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setError(''); }}
            >
              <i className="fas fa-user-plus"></i> Create Account
            </button>
          </div>
        )}

        {/* Error / Success Messages */}
        {error && (
          <div className="auth-alert error">
            <div className="auth-alert-row">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
            {mode === 'login' && error.toLowerCase().includes('no account') && (
              <button
                type="button"
                className="btn-alert-create-link"
                onClick={() => {
                  setMode('register');
                  setError('');
                  setFieldErrors({});
                }}
              >
                <i className="fas fa-user-plus"></i> Create this account now →
              </button>
            )}
          </div>
        )}
        {successMsg && (
          <div className="auth-alert success">
            <i className="fas fa-check-circle"></i> {successMsg}
          </div>
        )}

        {/* Demo Credentials Helper Pill (Only for Sign In) */}
        {mode === 'login' && (
          <div className="demo-credentials-card">
            <div className="demo-creds-info">
              <span className="demo-label"><i className="fas fa-shield-alt"></i> Demo Patron Access:</span>
              <span className="demo-values numeric-text">avinshjain521@gmail.com • Roshan@1965</span>
            </div>
            <div className="demo-actions-cluster">
              <button
                type="button"
                className="btn-fill-demo"
                onClick={handleFillDemo}
                title="Auto-fill demo credentials into form"
              >
                Auto Fill
              </button>
              <button
                type="button"
                className="btn-instant-demo-signin"
                onClick={handleInstantDemoLogin}
                title="Sign In immediately as VIP Patron"
                disabled={loading}
              >
                <i className="fas fa-bolt"></i> Instant Sign In
              </button>
            </div>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="authName">
                <i className="fas fa-user"></i> Full Name <span>*</span>
              </label>
              <input
                type="text"
                id="authName"
                className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                placeholder="e.g. Sanya Mehta"
                value={name}
                onBlur={handleBlurName}
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
          )}

          <div className="form-group">
            <label htmlFor="authEmail">
              <i className="fas fa-envelope"></i> Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="authEmail"
              className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
              placeholder="e.g. name@domain.com"
              value={email}
              onBlur={handleBlurEmail}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  if (validateEmailFormat(e.target.value)) {
                    setFieldErrors(prev => ({ ...prev, email: '' }));
                  }
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

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="authPhone">
                <i className="fas fa-phone-alt"></i> Mobile Number <span>*</span>
              </label>
              <input
                type="tel"
                id="authPhone"
                className={`form-control numeric-text ${fieldErrors.phone ? 'is-invalid' : ''}`}
                placeholder="+91 98765 43210"
                value={phone}
                onBlur={handleBlurPhone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) {
                    if (e.target.value.replace(/\D/g, '').length >= 10) {
                      setFieldErrors(prev => ({ ...prev, phone: '' }));
                    }
                  }
                }}
                required
              />
              {fieldErrors.phone && (
                <span className="field-error-text">
                  <i className="fas fa-exclamation-circle"></i> {fieldErrors.phone}
                </span>
              )}
            </div>
          )}

          {mode !== 'forgot' && (
            <div className="form-group">
              <div className="password-label-row">
                <label htmlFor="authPassword">
                  <i className="fas fa-lock"></i> Password <span>*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="btn-forgot-link"
                    onClick={() => { setMode('forgot'); setError(''); setFieldErrors({}); }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="authPassword"
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
          )}

          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? (
              <span><i className="fas fa-spinner fa-spin"></i> Processing...</span>
            ) : mode === 'login' ? (
              <span><i className="fas fa-shield-alt"></i> Sign In to Account</span>
            ) : mode === 'register' ? (
              <span><i className="fas fa-crown"></i> Join Privilege Club</span>
            ) : (
              <span><i className="fas fa-paper-plane"></i> Send Reset Link</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="auth-modal-footer">
          {mode === 'forgot' ? (
            <p>
              Remember your credentials?{' '}
              <button
                type="button"
                className="btn-text-link"
                onClick={() => setMode('login')}
              >
                Return to Sign In
              </button>
            </p>
          ) : mode === 'login' ? (
            <p>
              Don’t have an account yet?{' '}
              <button
                type="button"
                className="btn-text-link"
                onClick={() => setMode('register')}
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button
                type="button"
                className="btn-text-link"
                onClick={() => setMode('login')}
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
