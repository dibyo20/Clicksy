import { useState } from "react";
import "../styles/NotificationsModal.scss";
import { useUser } from "../hooks/useUser.js";

const NotificationsModal = ({ isOpen, onClose }) => {
  const { loading, requestedUsers, handleAcceptRequest, handleRejectRequest } =
    useUser();
  if (!isOpen) return null;

  const handleAcceptClick = async (username) => {
    await handleAcceptRequest(username);
  };

  const handleRejectClick = async (username) => {
    await handleRejectRequest(username);
  };

  return (
    <div className="notifications-modal-overlay" onClick={onClose}>
      <div
        className="notifications-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="notifications-modal-header">
          <h2 className="notifications-modal-title">Follow Requests</h2>
          <button
            className="notifications-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </header>

        <div className="notifications-modal-content">
          {!requestedUsers ? (
            <div className="no-requests-container">
              <span className="no-requests-icon">🔔</span>
              <p className="no-requests-text">No pending follow requests</p>
            </div>
          ) : (
            requestedUsers.map((request) => (
              <div key={request._id} className="request-card-item">
                <div className="request-card-info">
                  {/* <img
                    src={request.profileImage}
                    alt={request.username}
                    className="request-card-avatar"
                  /> */}
                  <div className="request-card-details">
                    <span className="request-card-name">
                      {request.follower}
                    </span>
                    {/* <span className="request-card-subtitle">
                      {request.fullname}
                    </span> */}
                  </div>
                </div>
                <div className="request-card-actions">
                  <button
                    className="request-card-btn accept"
                    onClick={() => handleAcceptClick(request.follower)}
                  >
                    Accept
                  </button>
                  <button
                    className="request-card-btn reject"
                    onClick={() => handleRejectClick(request.follower)}
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
