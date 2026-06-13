import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="background-glow shape-1"></div>
      <div className="background-glow shape-2"></div>
      <div className="background-glow shape-3"></div>

      <header className="landing-header">
        <div className="header-container">
          <div className="brand-logo" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="Clicksy Logo" className="logo-icon" />
            <span>Clicksy</span>
          </div>
          <div className="auth-buttons">
            <button className="btn-text" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-container">
            <div className="version-pill">
              <span className="pill-dot"></span>
              Introducing Clicksy 1.0
            </div>

            <h1 className="hero-title">
              Connecting the <br />
              <span className="gradient-text">Future of Social</span>
            </h1>

            <p className="hero-description">
              Experience a high-octane social ecosystem designed for elite digital creators.
              Precision geometry meets fluid interaction in the most premium social platform ever built.
            </p>

            <button className="btn-cta" onClick={() => navigate("/register")}>
              <span>Join the Future</span>
              <svg
                className="arrow-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </section>

        <section className="capabilities-section">
          <div className="section-header">
            <h2>Elite Capabilities</h2>
            <p>Redefining how you express yourself in the digital age with performance-driven tools.</p>
          </div>

          <div className="capabilities-grid">
            <div className="cap-card card-posts">
              <div className="card-header">
                <div className="icon-box">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <h3>Create Posts</h3>
                <p>
                  Share your world with rich media support, advanced filters, and cinematic
                  storytelling tools built for the modern attention span.
                </p>
              </div>
              <div className="card-visual visual-posts">
                <img
                  src="/create_posts_render.png"
                  alt="3D abstract helical render representing creative posts"
                  className="posts-render-img"
                />
              </div>
            </div>

            <div className="cap-card card-connect">
              <div className="card-header">
                <div className="icon-box">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3>Follow & Connect</h3>
                <p>
                  Build your network with curated creator circles and intelligent discovery
                  algorithms.
                </p>
              </div>
              <div className="card-visual visual-connect">
                <div className="avatar-stack">
                  <div className="avatar">
                    <img src="/messi.jpg" alt="Creator Avatar" />
                  </div>
                  <div className="avatar gradient-avatar-1">AM</div>
                  <div className="avatar gradient-avatar-2">JD</div>
                  <div className="avatar plus-avatar">+9k</div>
                </div>
              </div>
            </div>

            <div className="cap-card card-interactions">
              <div className="card-header">
                <div className="icon-box">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3>Real-time Interactions</h3>
                <p>
                  Instant feedback loops with haptic-inspired UI and ultra-low latency
                  engagement for elite creators.
                </p>
              </div>
              <div className="card-visual visual-interactions">
                <div className="pulse-network">
                  <div className="pulse-circle pulse-1"></div>
                  <div className="pulse-circle pulse-2"></div>
                  <div className="pulse-circle pulse-3"></div>
                  <div className="pulse-center">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="cap-card card-profiles">
              <div className="card-header">
                <div className="icon-box">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"></path>
                  </svg>
                </div>
                <h3>Premium Profiles</h3>
                <p>
                  Craft your digital legacy with exclusive glowing badges, animated banners, and high-fidelity profile skins.
                </p>
              </div>
              <div className="card-visual visual-profiles">
                <div className="mockup-profile-card">
                  <div className="mockup-profile-avatar">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="mockup-profile-lines">
                    <div className="mockup-line line-long"></div>
                    <div className="mockup-line line-short"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand-col">
            <div className="footer-logo-container">
              <img src="/logo.png" alt="Clicksy Logo" className="logo-icon" />
              <span className="footer-logo">Clicksy</span>
            </div>
            <p className="footer-tagline">
              The high-octane social layer for the elite digital creator economy. Join the revolution.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Discovery</li>
                <li>Premium</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li>Help Center</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Guidelines</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Clicksy Premium Social. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;