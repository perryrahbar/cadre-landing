import React, { useState } from 'react';
import './App.css';
import tennisCourt from './tennis-court.jpg';
import { ReactComponent as CadreLogo } from './cadre-logo.svg';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
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
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        if (window.gtag) {
          window.gtag('event', 'sign_up', {
            method: 'email',
          });
        }
        setSubmitted(true);
        setName('');
        setEmail('');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="App">
      <div className="landing-container" style={{ backgroundImage: `url(${tennisCourt})` }}>
        <div className="background-overlay"></div>

        <header className="top-bar">
          <CadreLogo className="logo" />
        </header>

        <div className="hero">
          <h2 className="hero-headline">
            PREMIUM SPORTS BEVERAGE
          </h2>
        </div>

        <footer className="bottom-bar">
          <a
            href="https://www.instagram.com/drinkcadre/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
          >
            @DRINKCADRE
          </a>
          <p className="tagline">NEW FUEL FOR A NEW PHASE.</p>
          <button className="signup-btn" onClick={() => setModalOpen(true)}>
            SIGN UP
          </button>
        </footer>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>

            <div className="modal-brand">
              <div className="brand-lines">
                <div className="red-line"></div>
                <div className="red-line"></div>
              </div>
              <CadreLogo className="modal-logo" />
              <div className="brand-lines">
                <div className="red-line"></div>
                <div className="red-line"></div>
              </div>
            </div>

            {!submitted ? (
              <>
                <p className="modal-text">
                  JOIN OUR MAILING LIST
                  FOR EXCLUSIVE INFO
                  AND LIMITED LAUNCHES
                </p>

                <form className="modal-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    className="modal-input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="send-btn" disabled={loading}>
                    {loading ? 'SENDING...' : 'SEND'}
                  </button>
                </form>

                {error && <p className="error-message">{error}</p>}
              </>
            ) : (
              <div className="success-content">
                <p className="success-message">
                  Thank you for joining.<br />We'll be in touch soon.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
