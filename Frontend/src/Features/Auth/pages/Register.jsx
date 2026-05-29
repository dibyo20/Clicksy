import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Register.scss";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/auth/register",
        {
          fullname: fullName,
          username: username,
          email: email,
          password: password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="register-left">
          <div className="register-content">
            <h1>Create Your Space.</h1>
            <p className="subtitle">
              Join Clicksy and start building meaningful connections through
              conversations and content.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe_clicksy"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
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

              <button
                type="submit"
                className="submit-btn"
                style={{ marginTop: "12px" }}
              >
                Create Account
              </button>

              <div className="register-footer">
                Already have an account? <Link to="/login">Login here</Link>
              </div>
            </form>
          </div>
        </div>

        <div className="register-right">
          <div className="glow-shape shape-1"></div>
          <div className="glow-shape shape-2"></div>

          <div className="glass-container">
            <div className="floating-cards">
              {/* Glass Card 1 */}
              <div className="glass-card card-1">
                <div className="icon-wrapper blue">🧠</div>
                <div className="card-content">
                  <h4>Share Your Story</h4>
                  <p>
                    Create posts, share updates, and express your ideas with
                    your community.
                  </p>
                </div>
              </div>

              {/* Glass Card 2 */}
              <div className="glass-card card-2">
                <div className="icon-wrapper green">🔄</div>
                <div className="card-content">
                  <h4>Stay Connected</h4>
                  <p>
                    Follow people who inspire you and never miss the
                    conversations that matter.
                  </p>
                </div>
              </div>

              {/* Glass Card 3 */}
              <div className="glass-card card-3">
                <div className="icon-wrapper purple">👥</div>
                <div
                  className="card-content"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <h4>Growing Community</h4>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#4b5563",
                        border: "2px solid #1e2025",
                        zIndex: 3,
                      }}
                    ></div>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#6b7280",
                        border: "2px solid #1e2025",
                        marginLeft: "-8px",
                        zIndex: 2,
                      }}
                    ></div>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#9ca3af",
                        border: "2px solid #1e2025",
                        marginLeft: "-8px",
                        zIndex: 1,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
