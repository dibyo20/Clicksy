import { useState } from "react";
import "../styles/UsersModal.scss";
import { useUser } from "../hooks/useUser.js";

const UsersModal = ({ isOpen, onClose }) => {
  const { loading, suggestedUsers, handleFollowUser } = useUser();
  const [userStatus, setUserStatus] = useState({});
  if (!isOpen) return null;

  const handleFollow = async (username) => {
    await handleFollowUser(username);
    setUserStatus((prev) => ({ ...prev, [username]: "Requested" }));
  };

  return (
    <div className="users-modal-overlay" onClick={onClose}>
      <div className="users-modal-window" onClick={(e) => e.stopPropagation()}>
        <header className="users-modal-header">
          <h2 className="users-modal-title">Suggested for you</h2>
          <button
            className="users-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </header>

        <div className="users-modal-content">
          {suggestedUsers.map((user) => (
            <div key={user._id} className="user-card-item">
              <div className="user-card-info">
                <img
                  src={user.profileImage}
                  alt={user.username}
                  className="user-card-avatar"
                />
                <div className="user-card-details">
                  <span className="user-card-name">{user.fullname}</span>
                  <span className="user-card-subtitle">{user.username}</span>
                </div>
              </div>
              <button
                className={`user-card-btn ${userStatus[user.username] === "Requested" ? "requested" : "follow"}`}
                onClick={() => handleFollow(user.username)}
                disabled={userStatus[user.username] === "Requested"}
              >
                {userStatus[user.username] || "follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
