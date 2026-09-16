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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Login failed.');
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
                  className="form-control"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">
                  <i className="fas fa-lock"></i> Password <span>*</span>
                </label>
                <input
                  type="password"
                  id="loginPassword"
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
                {loading ? 'Signing in...' : 'Sign In to Account'}
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
