import React, { useState } from 'react';
import './App.css';
import tennisCourt from './tennis-court.jpg';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="landing-container" style={{ backgroundImage: `url(${tennisCourt})` }}>
        <div className="background-overlay"></div>

        <div className="content-wrapper">
          <div className="logo">
            <h1 className="brand-name">CADRE</h1>
            <p className="tagline">A PREMIUM SPORTS BEVERAGE</p>
          </div>

          <div className="subtitle">
            <p>Focus. Fuel. Hydration.</p>
          </div>

          <div className="coming-soon">
            <h2>COMING SOON</h2>
          </div>

          <div className="ingredients">
            <span>COCONUT WATER</span>
            <span>HONEY</span>
            <span>GREEN TEA EXTRACT</span>
            <span>HIMALAYAN SALT</span>
          </div>

          <div className="signup-section">
            <form className="signup-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="email-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Submitting...' : submitted ? 'Welcome to Cadre' : 'Notify Me'}
              </button>
            </form>
            {submitted && (
              <p className="success-message">
                Thank you for joining. We'll be in touch soon.
              </p>
            )}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
