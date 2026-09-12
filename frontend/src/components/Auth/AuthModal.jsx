import { useState, useEffect } from 'react';
import { useAuth } from '@context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState(authModalMode); // 'login' | 'register' | 'forgot'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(authModalMode);
    setError('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email || !password) {
          setError('Please enter both email and password.');
          setLoading(false);
          return;
        }
        await login(email, password);
      } else if (mode === 'register') {
        if (!name || !email || !phone || !password) {
          setError('Please fill in all required fields.');
          setLoading(false);
          return;
        }
        await register({ name, email, phone, password });
      } else if (mode === 'forgot') {
        if (!email) {
          setError('Please enter your registered email address.');
          setLoading(false);
          return;
        }
        setSuccessMsg(`Password reset instructions have been sent to ${email}`);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
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
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}
        {successMsg && (
          <div className="auth-alert success">
            <i className="fas fa-check-circle"></i> {successMsg}
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
                className="form-control"
                placeholder="e.g. Sanya Mehta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="authEmail">
              <i className="fas fa-envelope"></i> Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="authEmail"
              className="form-control"
              placeholder="e.g. name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="authPhone">
                <i className="fas fa-phone-alt"></i> Mobile Number <span>*</span>
              </label>
              <input
                type="tel"
                id="authPhone"
                className="form-control numeric-text"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
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
                    onClick={() => { setMode('forgot'); setError(''); }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                id="authPassword"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
