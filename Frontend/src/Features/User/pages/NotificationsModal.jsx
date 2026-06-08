import { useState } from "react";
import "../styles/NotificationsModal.scss";

const NotificationsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock list of users who have requested to follow the logged-in user
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      username: "alex_travels", 
      fullname: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80" 
    },
    { 
      id: 2, 
      username: "emma_design", 
      fullname: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" 
    },
    { 
      id: 3, 
      username: "coder_dan", 
      fullname: "Dan Abramov",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" 
    },
    { 
      id: 4, 
      username: "sarah_k", 
      fullname: "Sarah Connor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80" 
    },
  ]);

  const handleAcceptClick = (username, id) => {
    console.log(`Accepted follow request from: ${username} (id: ${id})`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleRejectClick = (username, id) => {
    console.log(`Rejected follow request from: ${username} (id: ${id})`);
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="notifications-modal-overlay" onClick={onClose}>
      <div className="notifications-modal-window" onClick={(e) => e.stopPropagation()}>
        <header className="notifications-modal-header">
          <h2 className="notifications-modal-title">Follow Requests</h2>
          <button className="notifications-modal-close" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </header>

        <div className="notifications-modal-content">
          {requests.length === 0 ? (
            <div className="no-requests-container">
              <span className="no-requests-icon">🔔</span>
              <p className="no-requests-text">No pending follow requests</p>
            </div>
          ) : (
            requests.map((u) => (
              <div key={u.id} className="request-card-item">
                <div className="request-card-info">
                  <img src={u.avatar} alt={u.username} className="request-card-avatar" />
                  <div className="request-card-details">
                    <span className="request-card-name">{u.username}</span>
                    <span className="request-card-subtitle">{u.fullname}</span>
                  </div>
                </div>
                <div className="request-card-actions">
                  <button
                    className="request-card-btn accept"
                    onClick={() => handleAcceptClick(u.username, u.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="request-card-btn reject"
                    onClick={() => handleRejectClick(u.username, u.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
