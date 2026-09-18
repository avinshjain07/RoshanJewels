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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await register({ name, email, phone, password });
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Registration failed.');
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
                  className="form-control"
                  placeholder="e.g. Sanya Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="regEmail">
                  <i className="fas fa-envelope"></i> Email Address <span>*</span>
                </label>
                <input
                  type="email"
                  id="regEmail"
                  className="form-control"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="regPhone">
                  <i className="fas fa-phone-alt"></i> Mobile Number <span>*</span>
                </label>
                <input
                  type="tel"
                  id="regPhone"
                  className="form-control numeric-text"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="regPassword">
                  <i className="fas fa-lock"></i> Password <span>*</span>
                </label>
                <input
                  type="password"
                  id="regPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-auth-page-submit"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Join Privilege Club'}
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
