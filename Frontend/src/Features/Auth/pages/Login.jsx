import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Login.scss";
import axios from "axios";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/login", {
      username: identifier,
      password: password
    }, { withCredentials: true }).then((res) => { console.log(res.data) }).catch((err) => { console.log(err) })
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-left">
          <div className="login-content">
            <h1>Welcome back</h1>
            <p className="subtitle">
              Access your high-fidelity workspace and connect with your team.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="identifier">Username or Email</label>
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@company.com or name12"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-options">
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>

            <div className="login-footer">
              Don't have an account? <Link to="/register">Get started for free</Link>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="glow-shape shape-1"></div>
          <div className="glow-shape shape-2"></div>

          <div className="glass-container">
            <div className="floating-cards">
              {/* Mockup Base */}
              <div className="mockup-container">
                <div className="mockup-header">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div style={{ width: '100%', height: 'calc(100% - 60px)', overflow: 'hidden' }}>
                  <img src="/messi.jpg" alt="Featured Post" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: "top" }} />
                </div>
              </div>

              {/* Glass Card 1 */}
              <div className="glass-card card-1">
                <div className="icon-wrapper" style={{ background: '#000', color: '#fff', border: '1px solid #333' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="card-content">
                  <h4>The OG</h4>
                  <p>The new dashboard looks sick! 🚀</p>
                </div>
              </div>

              {/* Glass Card 2 */}
              <div className="glass-card card-2">
                <div className="icon-wrapper blue">
                  🔔
                </div>
                <div className="card-content">
                  <h4>Activity</h4>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    <span style={{ color: '#9ca3af' }}>🤍</span> New reaction on Post<br />
                    2 mins ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;