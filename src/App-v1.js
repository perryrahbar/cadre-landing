import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="App">
      <div className="landing-container">
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
            <span>COCONUT</span>
            <span>HONEY</span>
            <span>GREEN TEA</span>
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
              <button type="submit" className="submit-button">
                {submitted ? 'Welcome to Cadre' : 'Notify Me'}
              </button>
            </form>
            {submitted && (
              <p className="success-message">
                Thank you for joining. We'll be in touch soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
