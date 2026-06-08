import { useState } from "react";
import "../styles/NotificationsModal.scss";
import { useUser } from "../hooks/useUser.js";

const NotificationsModal = ({ isOpen, onClose }) => {
  const { loading, requestedUsers, handleAcceptRequest, handleRejectRequest } =
    useUser();
  const [requestStatus, setRequestStatus] = useState({});
  if (!isOpen) return null;

  const handleAcceptClick = async (username, id) => {
    await handleAcceptRequest(username);
    setRequestStatus((prev) => ({ ...prev, [id]: "accepted" }));
  };

  const handleRejectClick = async (username, id) => {
    await handleRejectRequest(username);
    setRequestStatus((prev) => ({ ...prev, [id]: "rejected" }));
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
          {!requestedUsers || requestedUsers.length === 0 ? (
            <div className="no-requests-container">
              <span className="no-requests-icon">
                <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="#4f8cff"
                    opacity="0.12"
                  />
                  <path
                    d="M42 27.5C42 22 38.2 18 33 17.2V15C33 14.4 32.6 14 32 14C31.4 14 31 14.4 31 15V17.2C25.8 18 22 22 22 27.5V34L19.6 38.2C19.1 39.1 19.7 40.2 20.8 40.2H43.2C44.3 40.2 44.9 39.1 44.4 38.2L42 34V27.5Z"
                    fill="#4f8cff"
                  />
                  <path
                    d="M28.5 43C29 44.8 30.4 46 32 46C33.6 46 35 44.8 35.5 43H28.5Z"
                    fill="#2d2f39"
                  />
                  <path
                    d="M39.5 16.5C43.2 18.4 45.5 22.2 45.5 26.5"
                    stroke="#2d2f39"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24.5 16.5C20.8 18.4 18.5 22.2 18.5 26.5"
                    stroke="#2d2f39"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
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
                  {(requestStatus[request._id] || request.status) !==
                  "pending" ? (
                    <button
                      className={`request-card-btn ${(requestStatus[request._id] || request.status) === "accepted" ? "accept" : "reject"}`}
                      disabled
                    >
                      {(requestStatus[request._id] || request.status) ===
                      "accepted"
                        ? "Accepted"
                        : "Rejected"}
                    </button>
                  ) : (
                    <>
                      <button
                        className="request-card-btn accept"
                        onClick={() =>
                          handleAcceptClick(request.follower, request._id)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="request-card-btn reject"
                        onClick={() =>
                          handleRejectClick(request.follower, request._id)
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
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
